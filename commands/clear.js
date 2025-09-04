const { SlashCommandBuilder } = require("discord.js");
const { CARGO_MODERADOR, CARGO_FS, CARGO_FFS } = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Deleta mensagens no canal.")
        .addIntegerOption(option =>
            option.setName("quantidade")
                .setDescription("Número de mensagens a deletar (1-100)")
                .setRequired(true)),

    async execute(interaction) {
        try {
            // Corrigido: deferReply com flags
            await interaction.deferReply({ flags: 64 });

            const allowedRoles = [CARGO_MODERADOR, CARGO_FS, CARGO_FFS];
            const member = await interaction.guild.members.fetch(interaction.user.id);
            const hasRole = allowedRoles.some(roleId => member.roles.cache.has(roleId));

            if (!hasRole) {
                return await interaction.editReply({
                    content: "Nice try, porém você não pode fazer isso. Peça a um moderador!"
                });
            }

            const amount = interaction.options.getInteger("quantidade");

            if (amount < 1 || amount > 100) {
                return await interaction.editReply({
                    content: "Me diga quantas mensagens você quer que eu apague...\nLembre-se, de 1 a 100!"
                });
            }

            const deletedMessages = await interaction.channel.bulkDelete(amount, true);

            await interaction.editReply({
                content: `🗑️ ${member.user}, apaguei ${deletedMessages.size} mensagens, como você pediu! 🗑️`
            });

        } catch (error) {
            console.error(error);
            // Se não tiver respondido ainda
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: "Não consegui executar esse comando. Verifique se tenho permissão!",
                    flags: 64
                });
            } else {
                await interaction.followUp({
                    content: "Não consigo apagar mensagens depois de duas semanas... Desculpe!",
                    flags: 64
                });
            }
        }
    }
};
