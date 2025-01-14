const { ButtonBuilder, EmbedBuilder } = require("@discordjs/builders")
const { Client, Message, ActionRowBuilder } = require("discord.js")

const { readdirSync } = require("node:fs")

module.exports = {
    name: "help",
    aliases: ["h", "commands"],
    usage: "s!help <command>",
    category: "bot",
    description: "Return all commands, or one specific command that the user can use",
    ownerOnly: false,

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param String[] args
     * 
     */
    run: async(client, message, args) => {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Github")
                .setStyle("Link")
                .setURL("https://www.google.com"),
            new ButtonBuilder()
                .setLabel("Support")
                .setStyle("Link")
                .setURL("https://discord.gg/QNYVdBCKnS")
                .setEmoji({ name: "❓" }),
        )

        if (!args[0]) {
            const botCommandsList = []
            readdirSync(`${client.cwd}/src/commands/prefix/bot`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/prefix/bot/${file}`)
                const name = `\`${filen.name}\``
                botCommandsList.push(name)
            })

            const utilityCommandsList = []
            readdirSync(`${client.cwd}/src/commands/prefix/utility`).forEach((file) => {
                const filen = require(`${client.cwd}/src/commands/prefix/utility/${file}`)
                const name = `\`${filen.name}\``
                utilityCommandsList.push(name)
            })

            const helpEmbed = new EmbedBuilder()
                .setTitle(`${client.user.username}'s Help Center`)
                .setDescription(`Hello **<@${message.author.id}>**, I am ${client.user.username}. \nYou can use \`s!help <command>\` to see more info about the commands!\n**Total Commands:** ${client.commands.size}\n**Total SlashCommands:** ${client.slash.size}`)
                .addFields(
                    { name: "🤖 - Bot Commands", value: botCommandsList.map((data) => `${data}`).join(", "), inline: true},
                    { name: "🛠 - Utility Commands ", value: utilityCommandsList.map((data) => `${data}`).join(", "), inline: true}
                )
                .setColor(0x73b0ff)
                .setTimestamp()
                .setFooter({ text: `${client.config.embedFooterText}`, iconURL: `${client.user.displayAvatarURL()}` })
            message.reply({ embeds: [helpEmbed], components: [row] })
        } else {
            const command = client.commands.get(args[0].toLowerCase() || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase())))

            if (!command) {
                message.reply({ content: `There isn't any command named "${args[0]}` })
            } else {
                let command = client.commands.get(args[0].toLowerCase() || client.commands.find((c) => c.aliases && c.aliases && c.aliases.includes(args[0].toLowerCase())))
                
                // Command Variables
                let name = command.name
                let description = command.description || "No description provided"
                let usage = command.usage || "No usage provided"
                let aliases = command.aliases || "No aliases provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new EmbedBuilder()
                    .setTitle(`${client.user.username} Help Center | \`${(name.toLocaleString())}\` Command`)
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: "Aliases", value: `${aliases}` },
                        { name: "Category", value: `${category}` },
                    )
                    .setColor(0x73b0ff)
                    .setTimestamp()
                    .setFooter({ text: `${client.config.embedFooterText}`, iconURL: `${client.user.displayAvatarURL()}` })
                message.reply({ embeds: [helpCmdEmbed] })
            }
        }
    }
}