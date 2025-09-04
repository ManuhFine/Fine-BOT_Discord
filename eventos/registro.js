const { Events, ActionRowBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const { CARGO_PROMO, CARGO_LIVES, CARGO_TUTOR, CARGO_APRENDIZ, CARGO_LOBBY, CARGO_INICIAL, CANAL_LOG } = require('../config');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const member = interaction.member; // Membro que completou o registro
    // ────────────── BOTÃO → abre modal para apelido ──────────────
    if (interaction.isButton() && interaction.customId === 'iniciar_registro') {
      const modal = new ModalBuilder()
        .setCustomId('modal_apelido')
        .setTitle('Escolha seu apelido');

      const apelidoInput = new TextInputBuilder()
        .setCustomId('apelido')
        .setLabel('Qual apelido você gostaria de usar?')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      modal.addComponents(new ActionRowBuilder().addComponents(apelidoInput));
      await interaction.showModal(modal);
      return;
    }

    // ────────────── MODAL → salva apelido e envia menus ──────────────
    if (interaction.isModalSubmit() && interaction.customId === 'modal_apelido') {
      let apelido = interaction.fields.getTextInputValue('apelido');
      const member = interaction.member;

      // Limita apelido a 32 caracteres (limite do Discord)
      if (apelido.length > 32) apelido = apelido.slice(0, 32);

      try {
        await member.setNickname(apelido);
      } catch {
        // caso não consiga alterar apelido, segue sem travar
      }
  
      // ────────────── Aqui você já dá um cargo inicial ao membro ──────────────

      try {
      // Obtém os cargos pelo ID
      const cargoLobby = member.guild.roles.cache.get(CARGO_LOBBY);
      const cargoInicial = member.guild.roles.cache.get(CARGO_INICIAL);

      if (cargoLobby) await member.roles.add(cargoLobby);
      if (cargoInicial) await member.roles.remove(cargoInicial);

      console.log(`✅ Cargo atualizado para ${member.user.tag}`);
      } catch (err) { console.error('Erro ao atualizar cargos:', err); }

      // Embed com instruções
      const embed = new EmbedBuilder()
        .setColor('#d880fb') // 6 dígitos, evita erro de cor
        .setTitle('🎯 Registro — Escolha suas opções')
        .setDescription('Agora escolha seus interesses e preferência:');

      // Menu 1: interesse
      const menuInteresse = new StringSelectMenuBuilder()
        .setCustomId('registro_interesse')
        .setPlaceholder('Selecione seu interesse...')
        .addOptions([
          { label: 'Lives', value: 'lives', emoji: '🎥' },
          { label: 'Jogos / Promoções', value: 'jogos', emoji: '🎮' },
          { label: 'Ambos', value: 'ambos', emoji: '✨' },
          { label: 'Nenhum', value: 'nenhum', emoji: '❌' }
        ]);

      // Menu 2: preferência
      const menuPreferencia = new StringSelectMenuBuilder()
        .setCustomId('registro_preferencia')
        .setPlaceholder('Gostaria de aprender coisas novas?')
        .addOptions([
          { label: 'Sim', value: 'sim', emoji: '📚' },
          { label: 'Não', value: 'não', emoji: '❌' },
        ]);

      await interaction.reply({
        embeds: [embed],
        components: [
          new ActionRowBuilder().addComponents(menuInteresse),
          new ActionRowBuilder().addComponents(menuPreferencia)
        ],
        flags: 64 // mensagem apenas para quem interagiu
      });
    }

    // ────────────── MENUS → aplica cargos ──────────────
    if (interaction.isStringSelectMenu()) {
  const member = interaction.member;
  const escolha = interaction.values[0];

  // Criamos um objeto temporário no member para guardar as escolhas
  if (!member._registro) member._registro = { interesse: null, preferencia: null };

  // Salva a escolha correta
  if (interaction.customId === 'registro_interesse') {
    member._registro.interesse = escolha;

    // Adiciona cargos
    if (escolha === 'lives' && !member.roles.cache.has(CARGO_LIVES)) await member.roles.add(CARGO_LIVES);
    if (escolha === 'jogos' && !member.roles.cache.has(CARGO_PROMO)) await member.roles.add(CARGO_PROMO);
    if (escolha === 'ambos') {
      if (!member.roles.cache.has(CARGO_LIVES)) await member.roles.add(CARGO_LIVES);
      if (!member.roles.cache.has(CARGO_PROMO)) await member.roles.add(CARGO_PROMO);
    }
  }

  if (interaction.customId === 'registro_preferencia') {
    member._registro.preferencia = escolha;

    // Adiciona cargos
    if (escolha === 'sim' && !member.roles.cache.has(CARGO_APRENDIZ)) await member.roles.add(CARGO_APRENDIZ);
  }

  // ────────────── ENVIA LOG SOMENTE QUANDO AMBOS ESTIVEREM DEFINIDOS ──────────────
  const { interesse, preferencia } = member._registro;
  if (interesse && preferencia) {
    try {
      const logChannel = interaction.client.channels.cache.get(CANAL_LOG);
      if (logChannel) {
        const apelidoSeg = member.displayName.length > 256 ? member.displayName.slice(0, 256) : member.displayName;
        const escolhaSeg = preferencia || 'Não definido';
        const interesseSeg = interesse || 'Não definido';

        const logEmbed = new EmbedBuilder()
          .setColor('Green')
          .setTitle('📝 Registro concluído')
          .setDescription(`${member} finalizou o registro!`)
          .addFields(
            { name: 'Apelido', value: apelidoSeg, inline: true },
            { name: 'Preferência', value: escolhaSeg, inline: true },
            { name: 'Interesse', value: interesseSeg, inline: true }
          )
          .setTimestamp();

        await logChannel.send({ embeds: [logEmbed] });

        // Limpa o registro temporário para o membro
        member._registro = null;
      }
    } catch (err) {
      console.error('Erro ao enviar log de registro:', err);
    }
  }

  // Atualiza a mensagem
  await interaction.update({ content: '✅ Registro atualizado!', components: interaction.message.components });
}
  }
}