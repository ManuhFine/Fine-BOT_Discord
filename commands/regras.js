const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("regras")
        .setDescription("Mostra as regras do servidor."),

    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor('#d880fb')
            .setTitle("📜 Regras do Servidor")
            .setDescription("Leia atentamente as regras para evitar punições.")
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: '🚫 Respeito', value: 'Seja respeitoso com todos os membros.', inline: false },
                { name: '📢 Sem SPAM', value: 'Não envie mensagens repetitivas.', inline: false },
                { name: '📌 Seguir TOS', value: 'Siga os Termos de Serviço do Discord.', inline: false },
            )
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Leia as regras para uma melhor experiência!', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        await interaction.reply({ embeds: [exampleEmbed] });
    }
};
