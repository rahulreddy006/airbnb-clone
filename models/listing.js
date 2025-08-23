const mongoose = require('mongoose');
const Review = require('./reviews');
let Schema = mongoose.Schema;

let listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        filename:String,
        url:String,
        

    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref :"Review",
        }
    ],
    owner: {
            type:Schema.Types.ObjectId,
            ref: "User"
        },
    geometry: {
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],  // [lng, lat]
    required: true
  }
 }

    
});


listingSchema.post("findOneAndDelete",async(listing)=>{

    if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}});
    }

});

let Listing = mongoose.model("Listing",listingSchema);

module.exports =Listing;