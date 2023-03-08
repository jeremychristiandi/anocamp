const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

// export our campground.js schema so it will be accessible in the app.js
module.exports = mongoose.model("Campground", CampgroundSchema);
