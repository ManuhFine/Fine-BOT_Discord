const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { CANAL_SUGESTOES } = require('../config');

module.exports = {
    name: Events.ClientReady,  // importante para o loadEvents
    once: true,             // será executado apenas uma vez
    async execute(client) {
        const channel = client.channels.cache.get(CANAL_SUGESTOES);
        if (!channel) return console.log("❌ Canal de sugestão não encontrado!");
        
        // Cria embed de registro
        const embed = new EmbedBuilder()
            .setColor('#793155')
            .setTitle('📝 Sugestões para o Servidor')
            .setDescription(
                `Você quer sugerir algo ao servidor?\n  
                • Diga sobre o que seria sua sugestão\n
                • E o que você sugere para melhorar\n\n
                **Após votações, as melhores sugestões podem ser implementadas!**\n\n
                Clique no botão abaixo para começar!`
            )
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

        // Cria botão
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('iniciar_sugestao')
                .setLabel('Enviar Sugestão')
                .setStyle(ButtonStyle.Success)
        );

        /*Envia a embed no canal de registro
        await channel.send({ embeds: [embed], components: [row] });
        console.log("✅ Mensagem de registro enviada!");*/
    },
};
