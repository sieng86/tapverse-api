const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let posts = [];

app.get("/", (req, res) => {
  res.send("API running...");
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text required" });
  }

  const newPost = {
    id: Date.now(),
    text,
  };

  posts.push(newPost);

  res.json(newPost);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
