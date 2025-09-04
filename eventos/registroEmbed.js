const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { CANAL_REGISTRO } = require('../config');

module.exports = {
    name: Events.ClientReady,  // importante para o loadEvents
    once: true,             // será executado apenas uma vez
    async execute(client) {
        const channel = client.channels.cache.get(CANAL_REGISTRO);
        if (!channel) return console.log("❌ Canal de registro não encontrado!");
        
        // Cria embed de registro
        const embed = new EmbedBuilder()
            .setColor('#fb80bd')
            .setTitle('📝 Registro do Servidor')
            .setDescription(
                `👋 Bem-vindo(a) Pandinha! \nPara liberar os canais, faça seu registro:\n  
                • Escolha um **apelido**  
                • Diga se prefere saber quando tem **lives**, **jogos em promoções**, etc (opcional)...  
                • Gostaria de **aprender coisas novas**?\n
                **OBS**: Ele adiciona o cargo automaticamente, mesmo que apareça erro _bug do discord_\n\n
                👉 Clique no botão abaixo para começar!`
            )
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

        // Cria botão
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('iniciar_registro')
                .setLabel('Começar Registro')
                .setStyle(ButtonStyle.Success)
        );

        /*Envia a embed no canal de registro
        await channel.send({ embeds: [embed], components: [row] });
        console.log("✅ Mensagem de registro enviada!");*/
    },
};
