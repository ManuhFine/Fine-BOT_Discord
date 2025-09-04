const { EmbedBuilder, Events } = require('discord.js');
const { CANAL_WELCOME, CARGO_INICIAL, CANAL_REGISTRO } = require('../config');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const guild = member.guild;

        // --- Obtém os canais ---
        const channelWEL = guild.channels.cache.get(CANAL_WELCOME);
        const channelREGI = guild.channels.cache.get(CANAL_REGISTRO);

        // Criação do embed de boas-vindas
        const embed = new EmbedBuilder()
            .setColor('#d880fb')
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setTitle('✨_🇼 _ 🇪 _ 🇱 _ 🇨 _ 🇴 _ 🇲 _ 🇪_✨')
            .setDescription(`🥳 𝓑𝓮𝓶 𝓿𝓲𝓷𝓭𝓸 ${member.user}, 𝓮𝓼𝓽𝓮 𝓮 𝓸 ${guild.name}🥰!\n𝓐𝓺𝓾𝓲 𝓿𝓸𝓬𝓮 𝓹𝓸𝓭𝓮𝓻𝓪 𝓯𝓪𝔃𝓮𝓻 𝓪𝓶𝓲𝓰𝓸𝓼 🫂,\n𝓙𝓸𝓰𝓪𝓻 𝓳𝓾𝓷𝓽𝓸𝓼 🎮,\n𝓐𝓹𝓻𝓮𝓷𝓭𝓮𝓻 𝓬𝓸𝓲𝓼𝓪𝓼 𝓷𝓸𝓿𝓪𝓼 ✍️\n𝓔 𝓪𝓲𝓷𝓭𝓪 𝓯𝓲𝓬𝓪 𝓹𝓸𝓻 𝓭𝓮𝓷𝓽𝓻𝓸 𝓭𝓮 𝓽𝓸𝓭𝓪𝓼 𝓪𝓼 𝓷𝓸𝓿𝓲𝓭𝓪𝓭𝓮𝓼 𝓭𝓪 𝓜𝓪𝓷𝓾𝓱𝓕𝓲𝓷𝓮!!😊\n𝓕𝓪𝓬𝓪 𝓼𝓮𝓾 𝓶𝓲𝓷𝓲 𝓻𝓮𝓰𝓲𝓼𝓽𝓻𝓸 𝓮𝓶 <#SALA_DE_REGISTRO> 👈👈 \n𝓔 𝓸𝓵𝓱𝓮 𝓪 𝓼𝓪𝓵𝓪 <#SALA_DE_REGRAS> 𝓹𝓪𝓻𝓪 𝓮𝓿𝓲𝓽𝓪𝓻 𝓹𝓾𝓷𝓲𝓬𝓸𝓮𝓼...⚠️⚠️⚠️⚠️\n\n🐼 𝓓𝓲𝓿𝓲𝓻𝓽𝓪-𝓼𝓮!!! 🐼\n🩷`)
            .setImage('https://i.pinimg.com/originals/70/cf/e2/70cfe286971f2c73043117abe29fa634.gif')
            .setFooter({ text: member.client.user.username, iconURL: member.client.user.displayAvatarURL() })
            .setTimestamp();

         // --- Envia embed no canal de boas-vindas ---
        if (channelWEL) {
            channelWEL.send({ embeds: [embed] });
        }

        // --- Adiciona o cargo inicial ---
        try {
            const role = guild.roles.cache.get(CARGO_INICIAL);
            if (role) {
                await member.roles.add(role);
                console.log(`✅ Cargo atribuído a ${member.user.tag}`);
            } else {
                console.log("❌ Cargo inicial não encontrado!");
            }
        } catch (error) {
            console.error("Erro ao adicionar cargo:", error);
        }

        // --- Cria uma thread privada no canal de registro ---
        if (channelREGI) {
            try {
                const thread = await channelREGI.threads.create({
                    name: `registro-${member.user.username}`,
                    autoArchiveDuration: 60,
                    type: 12, // Private thread
                    invitable: false
                });

            await thread.members.add(member.id);
            await thread.send(`📝 <@${member.id}>, faça seu registro para liberar os canais! 📝\nE não se esqueça de olhar o canal <#SALA_DE_REGRAS>`);
        } catch (err) {
            console.error("Erro ao criar thread privada:", err);
            }
        }
    },

};
