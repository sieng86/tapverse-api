const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// fake database (RAM)
let posts = [];

// test root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// CREATE post
app.post("/posts", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const newPost = {
    id: Date.now(),
    text,
  };

  posts.push(newPost);

  res.json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
