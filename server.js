import express from "express"
import cors from "cors"
import { createClient } from "@supabase/supabase-js"

const app = express()

// ✅ FIX CORS (cho Pi App)
app.use(cors({
origin: "*",
methods: ["GET", "POST"],
allowedHeaders: ["Content-Type"]
}))

app.use(express.json())

// ✅ Supabase
const supabase = createClient(
"https://yxmrokxagiydacmblflz.supabase.co",
"sb_publishable_Nbh1GUbR_fqZm9_LObfVaw_v0kEl62o"
)

// ✅ Test API
app.get("/", (req, res) => {
res.send("API running")
})

// ✅ SAVE LISTING
app.post("/save", async (req, res) => {
try {
const { username, title, description, price } = req.body

if (!username || !title) {
return res.status(400).json({ error: "Missing data" })
}

const { error } = await supabase
.from("listings")
.insert([{ username, title, description, price }])

if (error) {
return res.status(500).json({ error: error.message })
}

res.json({ success: true })

} catch (err) {
res.status(500).json({ error: err.message })
}
})

// ✅ GET LISTINGS
app.get("/list", async (req, res) => {
try {
const { data, error } = await supabase
.from("listings")
.select("*")
.order("id", { ascending: false })

if (error) {
return res.status(500).json({ error: error.message })
}

res.json(data || [])

} catch (err) {
res.status(500).json({ error: err.message })
}
})

// ✅ FIX PORT (QUAN TRỌNG)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
console.log("Server running on port " + PORT)
})
