const express = require("express");

const app = express();
app.use(express.json());

// TEST
app.get("/", (req, res) => {
  res.send("API READY");
});

// 👉 Fake database (RAM)
let listings = [];

// GET listings
app.get("/listings", (req, res) => {
  res.json(listings);
});

// CREATE listing
app.post("/create-listing", (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title required" });
    }

    const newItem = {
      id: Date.now(),
      title,
      description: description || "",
      price: price || 0,
    };

    listings.unshift(newItem);

    res.json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
