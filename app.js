const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const path = require("path");
const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController");

const app = express();

// connect DB
mongoose.connect("mongodb://localhost/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

const port = 3000;

// ROUTES
app.get("/", postController.getPosts);

app.get("/posts/:id", postController.getPost);

app.get("/about", pageController.getAboutPage);

app.get("/add_post", pageController.getAddPostPage);

app.post("/posts", postController.createPost);

app.put("/posts/:id", postController.updatePost);

app.delete("/posts/:id", postController.deletePost);

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
