const { Query } = require("mongoose");
const Listing = require("../models/listing");
const axios = require("axios");

module.exports.index = async(req,res)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});

};

module.exports.showListing = async(req,res)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{ path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for does not exit");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing,mapToken: process.env.MAP_TOKEN});
}

module.exports.createListing=async(req,res,next)=>{
    let listing = new Listing(req.body.listing);
    
    let url = req.file.path;
    let filename = req.file.filename;
    const { location } = req.body.listing;

const geoRes = await axios.get(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${process.env.MAP_TOKEN}`
    );

    if (!geoRes.data.features.length) {
      return res.status(400).json({ error: "Invalid location" });
    }

    const [lng, lat] = geoRes.data.features[0].center;

    
    listing.owner = req.user._id;
    listing.image = { filename,url};

    listing.geometry = {
      type: "Point",
      coordinates: [lng, lat]
    };

    await listing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
    
    

};

module.exports.editListing = async(req,res)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","listing you requested for does not exit");
        return res.redirect("/listings");
    }

    let originalImage = listing.image.url;
    originalImage=originalImage.replace("/upload","/upload/h_300,w_250");

    res.render("listings/edit.ejs",{listing,originalImage});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    Object.assign(listing, req.body.listing);

    if (req.body.listing.location) {
        const geoRes = await axios.get(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(req.body.listing.location)}.json?key=${process.env.MAP_TOKEN}`
        );

        if (geoRes.data.features.length) {
            const [lng, lat] = geoRes.data.features[0].center;
            listing.geometry = {
                type: "Point",
                coordinates: [lng, lat],
            };
        }
    }

    if (req.file) {
        listing.image = {
            filename: req.file.filename,
            url: req.file.path,
        };
    }
    await listing.save();

    console.log("Updated listing:", listing);

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};



module.exports.destroyListing = async(req,res)=>{
    let{id} = req.params;
    let deletedlist=await Listing.findByIdAndDelete(id);
    console.log(deletedlist);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};