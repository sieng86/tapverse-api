import express from "express"
import cors from "cors"
import { createClient } from "@supabase/supabase-js"

const app = express()
app.use(cors())
app.use(express.json())

const supabase = createClient(
  "https://yxmrokxagiydacmblflz.supabase.co",
  "sb_publishable_Nbh1GUbR_fqZm9_LObfVaw_v0kEl62o"
)

app.get("/", (req, res) => {
  res.send("API running")
})

app.post("/save", async (req, res) => {
  const { username, title, description, price } = req.body

  const { error } = await supabase.from("listings").insert([
    { username, title, description, price }
  ])

  if (error) return res.json({ error: error.message })

  res.json({ success: true })
})

app.get("/list", async (req, res) => {
  const { data } = await supabase.from("listings").select("*")
  res.json(data)
})

app.listen(3000)
