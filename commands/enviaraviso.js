const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js'); 
const { CANAL_AVISOS, CARGO_LOBBY, CARGO_MODERADOR, CARGO_FS } = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anuncio_live')
        .setDescription('Abre uma caixa de texto para enviar aviso ao canal de avisos.'),

    async execute(interaction) {
        // Permissão por cargo
        const allowedRoles = [CARGO_MODERADOR, CARGO_FS];
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const hasRole = allowedRoles.some(roleId => member.roles.cache.has(roleId));
        if (!hasRole) {
            return interaction.reply({
                content: "Isso não é bem um comando, é mais para o mods deixar o server bonitinho, mas as informações estão na sala <#1349610837488173056> :)",
                flags: 64
            });
        }

        // Cria o modal
        const modal = new ModalBuilder()
            .setCustomId('modal_mensagem')
            .setTitle('Enviar mensagem');

        const input = new TextInputBuilder()
            .setCustomId('aviso')
            .setLabel('Digite seu aviso ao pandinhas:')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const actionRow = new ActionRowBuilder().addComponents(input);
        modal.addComponents(actionRow);

        await interaction.showModal(modal);
    }
};


/*const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { CANAL_AVISOS, CARGO_LOBBY, CARGO_MODERADOR, CARGO_FS } = require('../config');

module.exports = (client) => {

    client.on('interactionCreate', async interaction => {
        // Comando slash
        if (interaction.isChatInputCommand() && interaction.commandName === 'enviar_aviso') {
            const allowedRoles = [CARGO_MODERADOR, CARGO_FS];
            const member = await interaction.guild.members.fetch(interaction.user.id);
            const hasRole = allowedRoles.some(roleId => member.roles.cache.has(roleId));
            if (!hasRole) {
                return interaction.reply({
                    content: "Isso não é bem um comando, é mais para o mods deixar o server bonitinho, mas as informações estão na sala <#1349610837488173056> :)",
                    flags: 64
                });
            }

            // Cria o modal
            const modal = new ModalBuilder()
                .setCustomId('modal_mensagem')
                .setTitle('Enviar mensagem');

            const input = new TextInputBuilder()
                .setCustomId('aviso')
                .setLabel('Digite seu aviso ao pandinhas:')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            const actionRow = new ActionRowBuilder().addComponents(input);
            modal.addComponents(actionRow);

            await interaction.showModal(modal);
        }

        // Submissão do modal
        if (interaction.isModalSubmit() && interaction.customId === 'modal_mensagem') {
            const aviso = interaction.fields.getTextInputValue('aviso');

            const embed = new EmbedBuilder()
                .setColor('#793155')
                .setTitle('**Atenção:**')
                .setDescription(aviso)
                .setFooter({ text: `Enviado por ${interaction.member.displayName}`, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp();

            const cargo = interaction.guild.roles.cache.get(CARGO_LOBBY);
            const menção = cargo ? `<@&${cargo.id}>` : '';

            const canal = interaction.guild.channels.cache.get(CANAL_AVISOS);
            if (!canal) return interaction.reply({ content: 'Canal não encontrado!', flags: 64 });

            await canal.send({ content: menção, embeds: [embed] });
            await interaction.reply({ content: 'Aviso enviado com sucesso!', flags: 64 });
        }
    });

    // Retorna os dados do slash command para o deploy-commands
    return {
        data: new SlashCommandBuilder()
            .setName('enviar_aviso')
            .setDescription('Abre uma caixa de texto para enviar aviso ao canal de avisos.')
    };
};*/
