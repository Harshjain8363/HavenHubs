const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../Models/Listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const wrapasync = require("../utils/wrapAsync.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'),
validateListing, wrapAsync(listingController.createListing));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
.delete(isOwner,isLoggedIn,wrapAsync(listingController.destroyListing ));

//Edit Route
router.get("/:id/edit",isOwner,isLoggedIn,wrapAsync(listingController.renderEditForm));

module.exports = router;
