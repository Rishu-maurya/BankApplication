const mongoose = require("mongoose")
const dns = require("dns")


if (process.env.DNS_SERVERS) {
    dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()))
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURI)
        console.log("MongoDb is connected")
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        process.exit(1)
    }
}

module.exports = connectDB