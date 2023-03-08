const mongoose = require("mongoose");
const cities = require("./cities.js");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers.js");

mongoose.connect("mongodb://127.0.0.1:27017/ano-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    let randomNum = Math.floor(Math.random() * 1000);
    let randomPrice = Math.floor(Math.random() * 20) + 10;
    let camp = new Campground({
      location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores nulla nostrum sed quo impedit fugiat temporibus nam autem accusamus suscipit eius veniam natus praesentium tempore, beatae maxime a odio.",
      price: randomPrice,
    });
    await camp.save();
  }
};

// Setelah ngeseed si location & title, kita tutup database nya (Di terminal)
seedDB().then(() => {
  mongoose.connection.close();
});
