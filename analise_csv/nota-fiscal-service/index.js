const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Enable CORS for all origins (not recommended for production)
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello, this is the I2A2 API server!")
})

// Query Nota Fiscal Data
app.post("/api/i2a2-nf-data", async (req, res) => {
  const payload = req.body
  const url = process.env.N8N_AGENT

  const authorization = btoa(process.env.N8N_USER + ":" + process.env.N8N_PASSWORD)
  const response = await fetch(`${url}/webhook/i2a2-nf-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization}`,
    },
    body: JSON.stringify(payload),
  })

  res.send(await response.json())
})

app.listen(3425, () => {
  console.log("Server listening on port 3425")
})
