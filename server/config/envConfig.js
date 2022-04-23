const dotenv = require("dotenv")
dotenv.config()

// Exporting env variables
module.exports = {
    connetionString: process.env.DATABASE_URL,
    port: process.env.PORT
}