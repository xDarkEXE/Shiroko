const fs = require("node:fs")

// loadEvents function
const loadEvents = async function(client) {
    const eventFolders = fs.readdirSync(`${client.cwd}/src/events`)
    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(`${client.cwd}/src/events/${folder}`)
            .filter((file) => file.endsWith(".js"))
            
        for (const file of eventFiles) {
            const event = require(`${client.cwd}/src/events/${folder}/${file}`)

            if (event.name) {
                console.log(`✔ => Event ${file} is being loaded`)
            } else {
                console.log(`❌ => Event ${file} missing a help.name or help.name is not in string`)
                continue
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client))
            } else {
                client.on(event.name, (...args) => event.execute(...args, client))
            }
        }
    }
}

// loadCommands Function
const loadCommands = async function(client) {
    const commandFolders = fs.readdirSync(`${client.cwd}/src/commands/prefix/`)
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${client.cwd}/src/commands/prefix/${folder}`)
            .filter((file) => file.endsWith(".js"))

        for (const file of commandFiles) {
            const command = require(`${client.cwd}/src/commands/prefix/${folder}/${file}`)

            if (command.name) {
                client.commands.set(command.name, command)
                console.log(`✔ => Prefix command ${file} is being loaded`)
            } else {
                console.log(`❌ => Prefix command ${file} missing a help.name or help.name is not in string`)
                continue
            }
            if (command.aliases && Array.isArray(command))
                command.aliases.forEach((alias) => client.aliases.set(alias, command.name))
        }
    }
}

// loadSlashCommands function
const loadSlashCommands = async function(client) {
    let slash = []

    const commandFolders = fs.readdirSync(`${client.cwd}/src/commands/slash`)
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${client.cwd}/src/commands/slash/${folder}`)
            .filter((file) => file.endsWith(".js"))

        for (const file of commandFiles) {
            const command = require(`${client.cwd}/src/commands/slash/${folder}/${file}`)

            if (command.name) {
                client.slash.set(command.name, command)
                slash.push(command)
                console.log(`✔ => SlashCommad ${file} is being loaded`)
            } else {
                console.log(`❌ => SlashCommand ${file} missing a help.name or help.name is not in string`)
                continue
            }
        }
    }

    client.on("ready", async() => {
        console.log("Registering Slash commands for all of the guilds")
        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands
}