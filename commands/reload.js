const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reinicia os comandos.')
		.addStringOption(option =>
			option.setName('commands')
				.setDescription('Insira o nome do comando para reiniciar')
				.setRequired(true)),
	async execute(interaction) {
		const allowedRoleIds = ["1351047583706910730", "1351047680406585374"]; // Substitua pelo ID do cargo permitido
		// Garante que o cache do membro está atualizado
		const member = await interaction.guild.members.fetch(interaction.user.id);
		// Verifica se o usuário tem algum dos cargos permitidos
		const hasRole = allowedRoleIds.some(roleId => member.roles.cache.has(roleId));
		if (!hasRole) {
            return await interaction.reply({ content: "O que você esta fazendo?\nIsso é apenas para moderadores!\nSe algum comando bugou, avise-os imediatamente!", 
											 ephemeral: true
			});
        }

		const nickname = member.nickname || member.user.username; //para usar o apelido ou o nickname da pessoa
		// Código para recarregar comandos
		await interaction.reply({ content: `Reiniciei o comando que você pediu ${member.user}`});
	},
};