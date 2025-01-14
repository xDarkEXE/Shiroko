const { Client } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,

    /**
     * 
     * @param { Client } client 
     */

    async execute(client) {
        client.user.setActivity("Sofia is really cool")

        console.log(`[LOG] ${client.user.username} is now online!`)
        console.log(`[LOG] Bot serving in ${client.guilds.cache.size} servers`)
        console.log(`[LOG] Bot serving ${client.users.cache.size} users`)
    }
}