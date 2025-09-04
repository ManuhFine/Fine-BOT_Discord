const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { CARGO_MODERADOR, CARGO_FS } = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("regras")
        .setDescription("Mostra as regras do servidor."),

    async execute(interaction) {
        const allowedRoles = [CARGO_MODERADOR, CARGO_FS];
        const member = await interaction.guild.members.fetch(interaction.user.id);
        const hasRole = allowedRoles.some(roleId => member.roles.cache.has(roleId));
            if (!hasRole) {
                await interaction.reply({
                    content: "Nice Try! Mas só os moderadores podem usar esse comando... veja as regras na sala <#1345077279461609594> :)",
                    flags: 64
                });
        }

        const exampleEmbed = new EmbedBuilder()
            .setColor('#a253e1')
            .setTitle("📜 Regras do Fine's Space ⚠️")
            .setImage('https://i.imgur.com/8ohI6NZ.png')
            .setDescription("Para uma boa convivência, aqui estão as regras que todos os membros devem seguir e aceitar para usar o servidor.\nO servidor pode te ajudar se você cooperar com ele!\n\nTodos são bem vindos!\n\n")
            .addFields(
                { name: '✅ *PERMITIDO:*', value: '_É recomendado falar com a moderação, mas se estiver dentro das regras, esta Okay!_\n', inline: false },
                { name: '> Divulgação:', value: '_Compartilhe, com permissão dos <@&1351047583706910730>, nas salas certas, para não ser deletado (estamos tentando ajudar a todos, ordem auxilia muito).\nPromoções apenas no <#1349611453040168990>,\nArtes na <#1349617178596343839>,\nCriações no <#1349620279403610134>,\nFontes e Sites uteis em <#1349618525169516574>;_\n', inline: false },
                { name: '> Mentorias:', value: '_Se você tem algo a ensinar, utilize a sala <#1349617797889654886>, \nou tem alguma duvida, use a sala de <#1349617107737907303>,\nse tiver alguma sugestão, use o canal <#1349615130542870588>.\nSe você precisar de suporte dos moderadores, sempre pode abrir um ticket em <#1349614977954349136>._\n', inline: false },
                { name: '> Call:', value: '_Temos várias salas de chat de voz, use de acordo com o que você quer, mantenha a ordem para não atrapalhar ninguém, nem mesmo você._\n', inline: false },
                { name: '> Parcerias:', value: '_Você pode consegui parcerias com outras pessoas, então deixe claro suas intenções e suas habilidades, tentaremos te ajudar e você pode ajudar a todos em troca._\n\n', inline: false },
                { name: '❌ *NÃO PERMITIDO:*', value: '_Passivo de Advertência, Kick e até mesmo Ban!_\n', inline: false },
                { name: '> Spam:', value: '_O envio repetitivo de mensagens idênticas, parecidas, desnecessariamente longas ou apenas com o intuito de atrapalhar conversas ou mentorias;_\n', inline: false },
                { name: '> Ofensas:', value: '_Mesmo que todos saibam que precisam respeitar para ser respeitado (e todos gostem de brincar), se qualquer tipo de ataque verbal seja considerado ofensivo para a vítima e/ou seja julgado ofensivo pela moderação;_\n', inline: false },
                { name: '> Conversas Inapropriadas', value: '_Qualquer conversa com teor sexual, imagem ou link com conteudo pornográfico.\n(Lembre-se, esse servidor pode te conectar a possiveis interessados ao seu trabalho!)_\n', inline: false },
                { name: '> Ações contra Servidores/Pessoas:', value: '_Nem sempre gostamos de tudo, mas qualquer tentativa de ataque contra servidores do Discord, lives, grupos ou Streamers, é totalmente o oposto da ideia desse servidor._\n', inline: false },
                { name: '> Pertubação no Privado:', value: '_Temos todos os canais especificados para tudo, sempre pode sugerir criações na sala <#1349615130542870588>, não pertube os membros no privado, e muito menos spamem o privado dos moderadores (todos são pessoas e estão ocupados com suas vidas!)._\n', inline: false },
                { name: '> Preconceitos de qualquer nivel:', value: '_Discriminação contra qualquer etnia, sexualidade, condição física, religião, identidade de gênero, entre outros._\n', inline: false },
                { name: '> Fakes:', value: '_Criar ou entrar em contas falsas/diferentes para enganar os moderadores ou os membros depois de ter sofrido punições._\n', inline: false },
                { name: '> Fake News e Politica:', value: '_Espalhar informações politicas, informações falsas ou enganosas, com intuito de propraganar discussões, tretas ou apenas mentiras para movimentar as conversas._\n', inline: false },
                { name: '> Violação do TOS do Discord:', value: '_Qualquer violação das regras presentes em_ https://discordapp.com/terms.', inline: false })
                .setFooter({ text: member.client.user.username, iconURL: member.client.user.displayAvatarURL(), });

        await interaction.reply({ embeds: [exampleEmbed] });
    }
};