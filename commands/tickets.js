const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { CANAL_SUPORTE, CANAL_TICKETS } = require('../config');

module.exports = {
  name: 'ticket',
  register(client) {
    // 🎯 Evento: messageCreate
    client.on('messageCreate', async (message) => {
      if (message.author.bot || message.channel.id !== CANAL_SUPORTE) return;

      const canalDestino = await client.channels.fetch(CANAL_TICKETS);

      const embed = new EmbedBuilder()
        .setColor(0x5865f2)
        .setTitle('📩 Novo Ticket Recebido')
        .addFields(
          { name: 'Usuário', value: `${message.author.tag} (<@${message.author.id}>)`, inline: false },
          { name: 'Mensagem', value: message.content || '*Sem texto*', inline: false }
        )
        .setFooter({ text: `ID do Usuário: ${message.author.id}` })
        .setTimestamp();

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('responder_ticket')
          .setLabel('Responder')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('fechar_ticket')
          .setLabel('Fechar')
          .setStyle(ButtonStyle.Danger)
      );

      const attachment = message.attachments.first();

      await canalDestino.send({
        embeds: [embed],
        components: [buttons],
        files: attachment ? [attachment] : []
      });

      await message.reply("✅ Seu ticket foi enviado para o suporte.");
    });

    // 🎯 Evento: interactionCreate
    client.on('interactionCreate', async (interaction) => {
      if (interaction.isButton()) {
        const userId = interaction.message.embeds[0]?.footer?.text?.split(': ')[1];

        if (interaction.customId === 'fechar_ticket') {
          await interaction.update({
            content: '✅ Ticket fechado.',
            embeds: interaction.message.embeds,
            components: []
          });
        }

        if (interaction.customId === 'responder_ticket') {
          const modal = new ModalBuilder()
            .setCustomId('modal_resposta')
            .setTitle('Responder ao Ticket');

          const resposta = new TextInputBuilder()
            .setCustomId('resposta_ticket')
            .setLabel("Digite a resposta para o usuário")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

          const row = new ActionRowBuilder().addComponents(resposta);
          modal.addComponents(row);

          await interaction.showModal(modal);
        }
      }

      if (interaction.isModalSubmit() && interaction.customId === 'modal_resposta') {
        const resposta = interaction.fields.getTextInputValue('resposta_ticket');
        const userId = interaction.message.embeds[0]?.footer?.text?.split(': ')[1];

        const membro = await interaction.guild.members.fetch(userId).catch(() => null);

        if (membro) {
          await membro.send(`📬 **Resposta ao seu ticket:**\n${resposta}`).catch(() => {});
          await interaction.reply({ content: '✅ Resposta enviada ao usuário!', ephemeral: true });
        } else {
          await interaction.reply({ content: '❌ Usuário não encontrado.', ephemeral: true });
        }
      }
    });
  }
}; console.log('Tickets estão registrados!');
// Este módulo registra o sistema de tickets no cliente Discord.js.
