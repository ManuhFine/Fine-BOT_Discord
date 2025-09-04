const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
const { CANAL_SUPORTE, CANAL_TICKETS, CARGO_MODERADOR, CAT_TICKETS } = require('../config');

module.exports = {
  name: 'ticket',
  register(client) {
    // 🎯 Evento: messageCreate
client.on('messageCreate', async (message) => {
  if (message.author.bot || message.channel.id !== CANAL_SUPORTE) return;

  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle('📨 Novo Pedido de Ticket')
    .addFields(
      { name: 'Usuário', value: `${message.author.tag} (<@${message.author.id}>)`, inline: false },
      { name: 'Mensagem', value: message.content || '*Sem texto*', inline: false }
    )
    .setFooter({ text: `ID do Usuário: ${message.author.id}` })
    .setTimestamp();

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`aceitar_ticket_${message.author.id}`)
      .setLabel('Aceitar')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`recusar_ticket_${message.author.id}`)
      .setLabel('Recusar')
      .setStyle(ButtonStyle.Danger)
  );

  const canalModeracao = await client.channels.fetch(CANAL_TICKETS);

  const attachments = [...message.attachments.values()];

  await canalModeracao.send({
    content: `📥 Novo pedido de ticket de <@${message.author.id}>`,
    embeds: [embed],
    components: [buttons],
    files: attachments.length ? attachments : []
  });

  await message.reply('✅ Seu pedido de ticket foi enviado para a equipe. Aguarde aprovação.');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const [acao, , userId] = interaction.customId.split('_');

  if (acao === 'aceitar' && userId) {
    const membro = await interaction.guild.members.fetch(userId).catch(() => null);
    if (!membro) return interaction.reply({ content: '❌ Usuário não encontrado.', 
                                            flags: 64
    });

    const canalTicket = await interaction.guild.channels.create({
      name: `ticket-${membro.user.username}`,
      type: ChannelType.GuildText,
      parent: CAT_TICKETS,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: [PermissionFlagsBits.ViewChannel]
        },
        {
          id: membro.id,
          allow: ['ViewChannel', 'SendMessages', 'AttachFiles', 'ReadMessageHistory']
        },
        {
          id: CARGO_MODERADOR,
          allow: ['ViewChannel', 'SendMessages', 'ManageMessages', 'AttachFiles']
        }
      ]
    });

    await canalTicket.send(`🎫 Canal de atendimento criado para <@${membro.id}>.`);

    const fecharButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('fechar_ticket')
        .setLabel('Fechar Ticket')
        .setStyle(ButtonStyle.Danger)
    );

    await canalTicket.send({
      content: '🔒 Clique abaixo para fechar o ticket quando terminar:',
      components: [fecharButton]
    });

    await interaction.reply({ content: `✅ Ticket criado: ${canalTicket}`, flags: 64 });
  }

  if (acao === 'recusar' && userId) {
    const membro = await interaction.guild.members.fetch(userId).catch(() => null);
    if (membro) {
      await membro.send('❌ Seu pedido de ticket foi recusado pela equipe de suporte.').catch(() => {});
    }
    await interaction.reply({ content: '❌ Pedido de ticket recusado.', flags: 64 });
  }

  if (interaction.customId === 'fechar_ticket') {
    const canal = interaction.channel;
    if (canal.parentId !== CAT_TICKETS) return;

    await interaction.reply({
      content: '✅ Este ticket será fechado em 3 segundos...',
      flags: 64
    });

    setTimeout(() => {
      canal.delete().catch(console.error);
    }, 3000);
  }
});

  }
}; console.log('Tickets estão registrados!');
// Este módulo registra o sistema de tickets no cliente Discord.js.