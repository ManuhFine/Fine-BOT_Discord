//Primeiro comando PADRÃO para testar o SlashCommand, não obrigatório.
const { SlashCommandBuilder } = require("discord.js") //usado para criar comandos de barra que o Discord entende e registra.

//exportando um objeto que representa o comando. Isso permite que ele seja importado por outro arquivo, geralmente onde o bot registra todos os comandos.
module.exports = {
    data: new SlashCommandBuilder() //a propriedade data é um novo objeto criado com SlashCommandBuilder(). Esse objeto define como será o comando.
    .setName("ping") //Nome do comando.
    .setDescription("Responde com 'Pong!"), //Descrição do que o comando faz.

    //Define a função execute, que será chamada quando o usuário usar o comando. 
    async execute(interaction) { //Essa função é assíncrona (async), o que permite usar await dentro dela. 
        //interaction é o objeto que representa a interação do usuário com o comando (quem usou, onde usou, etc.).
        await interaction.reply("Pong!") //resposta ao comando.
        //interaction.reply() envia essa resposta de volta ao Discord.
    }
}
