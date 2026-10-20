const mongoose = require("mongoose")
const dns = require("dns")

// sirf tab chalega jab .env me DNS_SERVERS likha ho
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