import express from "express"
import cors from "cors"
import { createClient } from "@supabase/supabase-js"

const app = express()
app.use(cors())
app.use(express.json())

// 👉 SUPABASE
const supabase = createClient(
  "https://yxmrokxagiydacmblflz.supabase.co",
  "sb_publishable_Nbh1GUbR_fqZm9_LObfVaw_v0kEl62o"
)

// ✅ TEST ROOT (fix Not Found)
app.get("/", (req, res) => {
  res.send("API running 🚀")
})

/* =========================
   MARKET
========================= */

// POST /save
app.post("/save", async (req, res) => {
  try {
    const { username, title, description, price } = req.body

    const { error } = await supabase
      .from("listings")
      .insert([{ username, title, description, price }])

    if (error) return res.json({ error: error.message })

    res.json({ success: true })
  } catch {
    res.json({ error: "Server error" })
  }
})

// GET /list
app.get("/list", async (req, res) => {
  try {
    const { data } = await supabase
      .from("listings")
      .select("*")
      .order("id", { ascending: false })

    res.json(data || [])
  } catch {
    res.json([])
  }
})

/* =========================
   SOCIAL
========================= */

// POST /post
app.post("/post", async (req, res) => {
  try {
    const { username, content } = req.body

    const { error } = await supabase
      .from("posts")
      .insert([{ username, content }])

    if (error) return res.json({ error: error.message })

    res.json({ success: true })
  } catch {
    res.json({ error: "Server error" })
  }
})

// GET /posts
app.get("/posts", async (req, res) => {
  try {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false })

    res.json(data || [])
  } catch {
    res.json([])
  }
})

/* =========================
   GAMES / LEADERBOARD
========================= */

// POST /score
app.post("/score", async (req, res) => {
  try {
    const { username, game, score } = req.body

    const { error } = await supabase
      .from("scores")
      .insert([{ username, game, score }])

    if (error) return res.json({ error: error.message })

    res.json({ success: true })
  } catch {
    res.json({ error: "Server error" })
  }
})

// GET /scores?game=TapFire
app.get("/scores", async (req, res) => {
  try {
    const { game } = req.query

    let query = supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false })

    if (game) query = query.eq("game", game)

    const { data } = await query

    res.json(data || [])
  } catch {
    res.json([])
  }
})

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})
