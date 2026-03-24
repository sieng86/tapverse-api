const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API READY");
});

let listings = [];

app.get("/listings", (req, res) => {
  res.json(listings);
});

app.post("/create-listing", (req, res) => {
  const { title, description, price } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  const newItem = {
    id: Date.now(),
    title: title,
    description: description || "",
    price: price || 0
  };

  listings.unshift(newItem);

  res.json({ success: true, data: newItem });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
