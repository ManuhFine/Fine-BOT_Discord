# 🤖 Bot do Discord – Assistent Bot

Um bot de Discord feito em JavaScript com Discord.js para Moderar a comunidade do discord, dar boas vindas, e interagir com demais membros.
Entre outras coisas...
Você pode se inspirar nessa base, só lembre-se de mudar os detalhes e deixar do seu jeito <3



## 🚀 Funcionalidades

- 🔨 Comandos de moderação 
- 🎲 Comandos divertidos 
- 💬 Interações com os usuarios
- ⚙️ Fácil de adicionar



## 🧰 Tecnologias usadas

- [Node.js](https://nodejs.org/)
- [Discord.js](https://discord.js.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)



## 📁 Estrutura do projeto

```bash
/
├── index.js
├── commands/
│   ├── ping.js
│   ├── clear.js
│   ├── info.js
│   ├── regras.js
├── eventos/
│   └── welcome.js
│   └── registroEmbed.js
│   └── registro.js
│   └── cumprimento.json
├── extras/
│   └── ticket.js
├── handlers/
│   └── loadEvents.js
├── deploy-commands.js
├── package-lock.json
├── package.json
└── README.md
