const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { CARGO_MODERADOR, CARGO_FS } = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("criador")
        .setDescription("Mostra informações importantes para os criadores."),

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
            .setColor('#500091')
            .setTitle("Atenção Criadores!")
            .setImage('https://i.imgur.com/8ohI6NZ.png')
            .setDescription("Informações uteis para vocês usarem no servidor e lembrete de umas regrinhas para continuar tudo funcionando bem por aqui :)")
            .addFields(
                { name: '✅ *PERMITIDO:*', value: '_Compartilhar da sua arte, criar seu portfólio e divulgar seu trabalho, desde que respeite as salas e os trabalhos de outros criadores._\n', inline: false },
                { name: '❌ *NÃO PERMITIDO:*', value: '_Spamar menções e forçar reações, conteúdo +18, ofender ou ridicularizar obras de outros criadores ou membros._\n', inline: false },
                { name: '🛠️ *Ferramentas ao seu favor:*', value: 'Se você faz da sua arte um freelance, utilize a sala <#1349611453040168990> com o @Promoções, mas não spame, quem tiver interesse verá e entrará em contato com você! (Lembre de por como funciona sua negociação e valores)', inline: false },
                { name: '🗂️ *Portfólio:*', value: '_Você pode criar um portfólio na sala <#1349620279403610134> e compartilhar todo o seu trabalho por lá. Lembre de ser organizado e manter atualizado, para criar mais curiosidade em possíveis clientes._\n', inline: false },
                { name: '📚 *Biblioteca:*', value: '_Se você quiser, pode pegar alguns arquivos (fontes, templates, sites com SVG, etc.) ou deixar arquivos relacionados a criação de conteúdos nessa sala <#1349618525169516574> (LEMBRANDO, TODOS OS ARQUIVOS SERÃO VERIFICADOS PELOS MODS, PARA EVITAR CONFUSÃO.)_\n', inline: false },
            )
            .setFooter({ text: member.client.user.username, iconURL: member.client.user.displayAvatarURL(), });

        await interaction.reply({ embeds: [exampleEmbed] });
    }
};