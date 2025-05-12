const { REST, Routes } = require("discord.js")

//dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//importação dos comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const commands = []

for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    console.log(`🔍 Carregando comando: ${file}`);  // Verifica quais comandos estão sendo lidos

    if (!command.data || typeof command.data.toJSON !== "function") {
        console.error(`❌ Erro no comando ${file}: "data" está ausente ou inválido!`);
        continue; // Pula esse comando e continua com os próximos
    }
    commands.push(command.data.toJSON())
}

// instância REST
const rest = new REST({version: "10"}).setToken(TOKEN);

// deploy
(async () => {
    try {
        console.log(`Resetando ${commands.length} comandos...`)

        // PUT
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
            console.log("Comandos registrado com sucesso!")
    }
    catch (error){
        console.error(error)
    }
})()