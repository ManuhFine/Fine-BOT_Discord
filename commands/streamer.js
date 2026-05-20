const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { CARGO_MODERADOR, CARGO_FS } = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("streamer")
        .setDescription("Mostra informações importantes para os streamers."),

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
            .setTitle("Atenção Streamers!")
            .setImage('https://i.imgur.com/8ohI6NZ.png')
            .setDescription("Informações uteis para vocês usarem no servidor e lembrete de umas regrinhas para continuar tudo funcionando bem por aqui :)")
            .addFields(
                { name: '✅ *PERMITIDO:*', value: '_Compartilhar seu conteúdo de streaming ou vídeos._\n', inline: false },
                { name: '❌ *NÃO PERMITIDO:*', value: '_Spamar menções e forçar reações, conteúdo +18, ofender ou ridicularizar trabalhos de outros membros._\n', inline: false },
                { name: '🛠️ *Ferramentas ao seu favor:*', value: 'A sala <#1349611031420207115> é dedicada a streamers e pode ser útil para você.', inline: false },
                { name: '👀 *Clipes:*', value: '_Se aconteceu algo em sua live que você clipou e quer compartilhar use a sala <#1349614800321118238>, isso ajuda na divulgação de suas lives._\n', inline: false },
                { name: '📚 *Biblioteca:*', value: '_Se você quiser, pode pegar alguns arquivos (fontes, templates, sites com SVG, etc.) ou deixar arquivos relacionados a criação de conteúdos nessa sala <#1349618525169516574> (LEMBRANDO, TODOS OS ARQUIVOS SERÃO VERIFICADOS PELOS MODS, PARA EVITAR CONFUSÃO.)_\n', inline: false },
            )
            .setFooter({ text: member.client.user.username, iconURL: member.client.user.displayAvatarURL(), });

        await interaction.reply({ embeds: [exampleEmbed] });
    }
};