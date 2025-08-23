const { redirect } = require("express/lib/response");
const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const Expresserror = require("./utils/Expresserror.js");
const {listingSchema}= require("./Schema.js");
const {reviewSchema}= require("./Schema.js");

module.exports.isLoggedIn =(req,res,next)=>{
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must logged in!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errMsg);
    }else {
        next();
    }

};

module.exports.validatereview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errMsg);
    }else {
        next();
    }

};

module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author to delete");
        return res.redirect(`/listings/${id}`);
    }
    next();
}