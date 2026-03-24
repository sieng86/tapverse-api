const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API READY");
});

let listings = [];

// GET
app.get("/listings", (req, res) => {
  res.json(listings);
});

// POST (FIX FULL DATA)
app.post("/create-listing", (req, res) => {
  try {
    const {
      title,
      description,
      content,
      category,
      duration,
      tags,
      price,
      allowDownload
    } = req.body;

    const newItem = {
      id: Date.now(),
      title: title || "",
      description: description || "",
      content: content || "",
      category: category || "",
      duration: duration || 0,
      tags: tags || "",
      price: price || 0,
      allowDownload: allowDownload || false
    };

    listings.unshift(newItem);

    res.json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
