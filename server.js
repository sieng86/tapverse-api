const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Supabase config
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// TEST
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// =====================
// SOCIAL
// =====================

// GET POSTS
app.get("/posts", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) return res.json([]);

    res.json(data || []);
  } catch (err) {
    res.json([]);
  }
});

// POST CREATE
app.post("/posts", async (req, res) => {
  try {
    const { username, content } = req.body;

    const { error } = await supabase.from("posts").insert([
      {
        username: username || "Guest",
        content,
        createdAt: new Date().toISOString(),
      },
    ]);

    if (error) return res.json({ error: error.message });

    res.json({ success: true });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

// =====================
// GAME (optional)
// =====================

app.post("/score", async (req, res) => {
  try {
    const { username, game, score } = req.body;

    const { error } = await supabase.from("scores").insert([
      { username, game, score },
    ]);

    if (error) return res.json({ error: error.message });

    res.json({ success: true });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

app.get("/scores", async (req, res) => {
  try {
    const { game } = req.query;

    let query = supabase.from("scores").select("*");

    if (game) query = query.eq("game", game);

    const { data } = await query;

    res.json(data || []);
  } catch (err) {
    res.json([]);
  }
});

// =====================

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running 🚀"));
