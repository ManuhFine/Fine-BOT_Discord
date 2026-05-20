const { Events, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const { CANAL_SUGESTOES_VT } = require('../config');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // ────────────── BOTÃO → abre modal ──────────────
    if (interaction.isButton() && interaction.customId === 'iniciar_sugestao') {
      const modal = new ModalBuilder()
        .setCustomId("modal_sugestao")
        .setTitle("💡 Nova Sugestão");

      const sugestaoTitleInput = new TextInputBuilder()
        .setCustomId('titulo')
        .setLabel('Sobre o que seria sua sugestão?')
        .setStyle(TextInputStyle.Short) // título melhor curto
        .setRequired(true);

      const sugestaoInput = new TextInputBuilder()
        .setCustomId("sugestao")
        .setLabel("Descreva sua sugestão:")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(sugestaoTitleInput),
        new ActionRowBuilder().addComponents(sugestaoInput)
      );

      await interaction.showModal(modal);
      return;
    }

    // ────────────── MODAL → pega os valores ──────────────
    if (interaction.isModalSubmit() && interaction.customId === 'modal_sugestao') {
      const titulo = interaction.fields.getTextInputValue('titulo');
      const sugestao = interaction.fields.getTextInputValue('sugestao');
      const member = interaction.member;

      // monta embed
      const embed = new EmbedBuilder()
        .setColor('#793155')
        .setTitle(`💡 Sugestão: ${titulo}`)
        .setDescription(sugestao)
        .setFooter({ text: `Enviado por ${member.displayName}`, iconURL: member.displayAvatarURL() })
        .setTimestamp();

      try {
        const canalSugestoes = interaction.client.channels.cache.get(CANAL_SUGESTOES_VT);
        if (!canalSugestoes) {
          return await interaction.reply({ content: "❌ Canal de sugestões não encontrado!", flags: 64 });
        }

        // envia a mensagem e guarda em sugestaoMsg
        const sugestaoMsg = await canalSugestoes.send({ embeds: [embed] });

        // adiciona reações automaticamente
        await sugestaoMsg.react('👍');
        await sugestaoMsg.react('👎');

        // responde o usuário de forma privada
        await interaction.reply({
          content: "✅ Sua sugestão foi enviada com sucesso!\nConfira a sala <#1349615130542870588>",
          flags: 64
        });
      } catch (err) {
        console.error("Erro ao enviar sugestão:", err);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: "❌ Ocorreu um erro ao enviar sua sugestão.", flags: 64 });
        }
      }
    }
  }
}
