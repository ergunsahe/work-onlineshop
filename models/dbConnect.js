const mongoose = require("mongoose")

const DB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useCreateIndex:true,
            useFindAndModify:true,
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log("Successfully connected")
    } catch (err) {
        console.log("error:", err)
    }
}

module.exports = DB