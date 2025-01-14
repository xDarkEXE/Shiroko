const { Client, Message, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    aliases: ["pong", "latency"],
    category: "utility",
    description: "Check the bot's latency",
    ownerOnly: false,

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param String[] args 
     */

    run: async(client, message, args) => {
        const msg = await message.channel.send(`Pinging...`)

        const pingEmbed = new EmbedBuilder()
            .setTitle(":signal_strength: Bot Ping")
            .addFields(
                { name: "Time", value: `${Math.floor(msg.createdAt - message.createdAt)}ms`, inline: true},
                { name: "API Ping", value: `${client.ws.ping}ms`, inline: true},
            )
            .setColor(client.config.embedColor)
            .setTimestamp()
            .setFooter({ text: `${client.config.embedFooterText}`, iconURL: `${client.user.displayAvatarURL()}` })
        
        await message.reply({ embeds: [pingEmbed] })
    }
}