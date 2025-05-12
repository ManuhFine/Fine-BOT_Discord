const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Deleta mensagens no canal.")
        .addIntegerOption(option =>
            option.setName("quantidade")
                .setDescription("Número de mensagens a deletar (1-100)")
                .setRequired(true)),

    async execute(interaction) {
        const allowedRoleIds = ["1351047583706910730", "1351047680406585374"]; // Substitua pelo ID do cargo permitido
        // Garante que o cache do membro está atualizado
        const member = await interaction.guild.members.fetch(interaction.user.id);
        // Verifica se o usuário tem algum dos cargos permitidos
        const hasRole = allowedRoleIds.some(roleId => member.roles.cache.has(roleId));
        if (!hasRole) {
            return await interaction.reply({ content: "Nice try, porém você não pode fazer isso. Peça a um moderador!", 
                                             ephemeral: true  
            });
        }

        const amount = interaction.options.getInteger("quantidade");

        if (amount < 1 || amount > 100) {
            return await interaction.reply({ content: "Me diga quantas mensagens você quer que eu apague...\nLembre-se, de 1 a 100!",
                                             ephemeral: true
            });
        }

        const nickname = member.nickname || member.user.username;

        try {
            const deletedMessages = await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({ content: `🗑️ ${member.user}, apaguei ${deletedMessages.size} mensagens, como você pediu! 🗑️ `});
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Não consigo apagar mensagens depois de duas semanas... Desculpe!", 
                                      ephemeral: true
            });
        }
    }
};
