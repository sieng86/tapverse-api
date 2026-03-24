const express = require("express");
const app = express();

app.use(express.json());

let posts = [];

// test
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// get posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// create post
app.post("/posts", (req, res) => {
  const { username, content } = req.body;

  const newPost = {
    id: Date.now(),
    username: username || "Guest",
    content
  };

  posts.unshift(newPost);
  res.json(newPost);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running"));
