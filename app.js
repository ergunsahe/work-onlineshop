const express = require("express")
require("dotenv").config()
const dbConnect = require("./models/dbConnect")
const router = require("./routes/router")

const app = express()

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api", router)


dbConnect()



app.listen(port, () => {
    console.log(`I am listening on port ${port}`)
})