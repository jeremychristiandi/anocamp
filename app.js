const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Campground = require("./models/campground");
const ejsMate = require("ejs-mate");

mongoose.connect("mongodb://127.0.0.1:27017/ano-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
// Set
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/campgrounds", async (req, res) => {
  let campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

// '/campgrounds/new' gaboleh di bawah /:id -> bakal ke overwrite
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

// req.body -> ngambil semua yg di insert sama user dari 'campgrounds/new'
app.post("/campgrounds", async (req, res) => {
  let campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

app.get("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  let campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT [3000]");
});
