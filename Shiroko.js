console.clear()
console.debug("Starting Shiroko bot")

require("dotenv").config()
const Discord = require("discord.js")
const { Client, Collection, GatewayIntentBits } = Discord
const handler = require("./src/handlers/index")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
    ]
})

// Global Variables
client.discord = Discord
client.commands = new Collection()
client.slash = new Collection()
client.config = require("./src/config/shirokoConfig")
client.cwd = require("process").cwd()

handler.loadEvents(client)
handler.loadCommands(client)
handler.loadSlashCommands(client)

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err)
})

process.on("unhandledRejection", (reason, promise) => {
    console.error("[FATAL] Possibly Unhandled Rejection at: Promise", promise, "\nreason:", reason.message)
})

client.login(process.env.TOKEN)
module.exports = client