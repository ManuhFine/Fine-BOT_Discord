// Exigir as classes discord.js necessárias
const { Client, Events, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js')
const dotenv = require('dotenv')
const tickets = require('./extras/ticket');
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

//importação dos comandos
const fs = require("node:fs")
const path = require("node:path")

// Cria uma nova instância do cliente
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
  });

client.commands = new Collection()

function carregarComandosDe(pasta) {
  const caminho = path.join(__dirname, pasta);
  const arquivos = fs.readdirSync(caminho).filter(file => file.endsWith('.js'));

  for (const file of arquivos) {
    const filePath = path.join(caminho, file);
    const comando = require(filePath);

    if ('data' in comando && 'execute' in comando) {
      if (client.commands.has(comando.data.name)) {
        console.warn(`⚠️ Comando duplicado: ${comando.data.name}, ignorando...`);
        continue;
      }
      client.commands.set(comando.data.name, comando);
      console.log(`✅ Comando carregado: ${comando.data.name} (${pasta}/${file})`);
    } else {
      console.log(`❌ Comando com erro: ${filePath} está sem "data" ou "execute"`);
    }
  }
}
// Carrega os comandos das pastas
carregarComandosDe('commands');
carregarComandosDe('extras');

console.log(client.commands)
// Quando o cliente estiver pronto, execute este código (apenas uma vez).
// A distinção entre `client: Client<boolean>` e `readyClient: Client<true>` é importante para desenvolvedores TypeScript.
// Torna algumas propriedades não anuláveis.
client.on(Events.ClientReady, readyClient => {
	console.log(`Estou on no discord como ${readyClient.user.tag}`)
});

//listener de interações/Slash commands
// Verifica se o comando é um comando de chat
client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return; // Verifique se é um comando de chat
    const command = interaction.client.commands.get(interaction.commandName) 
    if (!command) {
        console.error("Comando não existente")
        return;
    }
    try {
        await command.execute(interaction) //execute comando
    }
    catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar o comando!")
    }
})

client.on('messageCreate', (msg) => {
    const cumprimento = require('./extras/cumprimento.json');
    
    if (msg.author.bot) return;
  
    if (cumprimento[msg.content]) {
      msg.reply(cumprimento[msg.content]);
    }
  });

// 🔗 Registra os eventos do seu módulo
tickets.register(client);

// Importação dos eventos
const eventsPath = path.join(__dirname, "extras");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.name) {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Faça login no Discord com o token do seu cliente
client.login(TOKEN)
