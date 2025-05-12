const { EmbedBuilder, GatewayIntentBits } = require('discord.js');
intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent]

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const guild = member.guild; // Obtém o servidor
        const channelId = "1345077377381695568"; // Substitua pelo ID do canal onde deseja enviar o embed
        const roleId = "1351059482666336337";

        // Obtém o canal de boas-vindas
        const channel = guild.channels.cache.get(channelId);
        if (!channel) return console.log("Canal de boas-vindas não encontrado!");

        // Criação do embed de boas-vindas
        const embed = new EmbedBuilder()
            .setColor('#d880fb')
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setTitle('✨_🇼 _ 🇪 _ 🇱 _ 🇨 _ 🇴 _ 🇲 _ 🇪_✨')
            .setDescription(`🥳 𝓑𝓮𝓶 𝓿𝓲𝓷𝓭@ ${member.user}, 𝓮𝓼𝓽𝓮 𝓮 𝓸 ${guild.name}🥰!\n𝓐𝓺𝓾𝓲 𝓿𝓸𝓬𝓮 𝓹𝓸𝓭𝓮𝓻𝓪 𝓯𝓪𝔃𝓮𝓻 𝓪𝓶𝓲𝓰𝓸𝓼 🫂,\n𝓙𝓸𝓰𝓪𝓻 𝓳𝓾𝓷𝓽𝓸𝓼 🎮,\n𝓐𝓹𝓻𝓮𝓷𝓭𝓮𝓻 𝓬𝓸𝓲𝓼𝓪𝓼 𝓷𝓸𝓿𝓪𝓼 ✍️\n𝓔 𝓪𝓲𝓷𝓭𝓪 𝓯𝓲𝓬𝓪 𝓹𝓸𝓻 𝓭𝓮𝓷𝓽𝓻𝓸 𝓭𝓮 𝓽𝓸𝓭𝓪𝓼 𝓪𝓼 𝓷𝓸𝓿𝓲𝓭𝓪𝓭𝓮𝓼 𝓭𝓪 𝓜𝓪𝓷𝓾𝓱𝓕𝓲𝓷𝓮!!😊\n𝓕𝓪𝓬𝓪 𝓼𝓮𝓾 𝓶𝓲𝓷𝓲 𝓻𝓮𝓰𝓲𝓼𝓽𝓻𝓸 𝓮𝓶 <#1345077619036524584> 👈👈 \n𝓔 𝓸𝓵𝓱𝓮 𝓪 𝓼𝓪𝓵𝓪 <#1345077279461609594> 𝓹𝓪𝓻𝓪 𝓮𝓿𝓲𝓽𝓪𝓻 𝓹𝓾𝓷𝓲𝓬𝓸𝓮𝓼...⚠️⚠️⚠️⚠️\n\n🐼 𝓓𝓲𝓿𝓲𝓻𝓽𝓪-𝓼𝓮!!! 🐼\n🩷`)
            .setImage('https://i.pinimg.com/originals/70/cf/e2/70cfe286971f2c73043117abe29fa634.gif')
            .setFooter({ text: member.client.user.username, iconURL: member.client.user.displayAvatarURL() })
            .setTimestamp();

        // Envia o embed no canal de boas-vindas
        channel.send({ embeds: [embed] });
        // Adiciona o cargo ao novo membro
        try {
            const role = guild.roles.cache.get(roleId); // Obtém o cargo pelo ID
            if (role) {
                await member.roles.add(role); // Dá o cargo ao membro
                console.log(`Cargo atribuído a ${member.user.tag}`);
            } else {
                console.log("Cargo não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao adicionar cargo:", error);
        }
    }
};