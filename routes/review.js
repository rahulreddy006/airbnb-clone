const express = require("express");
const router = express.Router({mergeParams :true});
const wrapAsync = require("../utils/wrapAsync.js");

const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validatereview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");





//review route

router.post("/",isLoggedIn,validatereview,wrapAsync( reviewController.createReview));

//review delete route

router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;