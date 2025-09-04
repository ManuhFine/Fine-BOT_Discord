const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { CARGO_MODERADOR, CARGO_FS } = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Informações básicas do servidor."),

    async execute(interaction) {
        const allowedRoles = [CARGO_MODERADOR, CARGO_FS];
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const hasRole = allowedRoles.some(roleId => member.roles.cache.has(roleId));
            if (!hasRole) {
                await interaction.reply({
                    content: "Isso não é bem um comando, é mais para o mods deixar o server bonitinho, mas as informações estão na sala <#1349610837488173056> :)",
                    flags: 64
                });
        }

        const exampleEmbed = new EmbedBuilder()
            .setColor('#de1af8')
            .setTitle("SOBRE O SERVIDOR E SOBRE A FINE")
            .setImage('https://i.imgur.com/Eub6Mrh.png')
            .addFields(
		            { name: '> Sobre a Fine:', value: ' Manuh Fine é uma streamer, programadora iniciante e teve a ideia de gerar esse servidor para ajudar tantos os amigos quanto os futuros criadores que aparecerem pelo servidor, divulgando tanto arte, quando projetos e dando espaço para que todos se divirtam!' },
		            { name: '> Sobre o Servidor:', value: 'Esse servidor é um espaço para compartilhamento de conhecimento e trabalhos (tanto para criadores de conteudo em stream, quando moders, quanto programadores e artisticos), quase como um portfólio de Artes' },
                    { name: '> Artes, Projetos, Trabalhos', value: 'Todo mundo é bem vindo, desde que respeite as regrinhas.\nQualquer conteudo criado terá seus créditos, sua assinatura.\nVocê pode compartilhar ou aprender coisas novas com todos, além de compartilhar coisas que você descobriu.', inline: false },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Portfólio da Fine', value: 'Acesse os links abaixo para ficar por dentro do que a Fine tem feito', inline: false },
                    { name: 'GitHub', value: 'https://github.com/ManuhFine', inline: true },
		            { name: 'Twitch', value: 'https://www.twitch.tv/manuhfine', inline: true },
                    { name: 'TikTok', value: 'https://www.tiktok.com/@manuhfine', inline: true },
                    { name: 'Patreon', value: 'https://www.patreon.com/c/manuhfine', inline: true },
	            )
            .setFooter({ text: member.client.user.username, iconURL: member.client.user.displayAvatarURL(), });

        await interaction.reply({ embeds: [exampleEmbed] });
    }
};