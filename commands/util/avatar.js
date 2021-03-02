const { MessageEmbed } = require('helperis');

module.exports = {
    name: "avatar",
    aliases: ["av", "icon"],
    category: "util",
    description: "returns your avatar or the person you pinged avatar!",
    usage: "`<avatar`",
    run: async (bot, msg, args) => {

        let server = msg.guild;

        let memberAvatar = msg.mentions[0];

        if(!msg.mentions[0] || msg.channel.guild.members.get(args[0])) {
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`[Avatar URL](${msg.author.dynamicAvatarURL("png", 2048)})`)
        .setTitle(`${msg.author.username}'s avatar`)
        .setImage(msg.author.dynamicAvatarURL("png", 2048))

        msg.channel.createMessage({ embed: embed.code });
        } else {

        let User = msg.mentions[0]

        const otherEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${User.username}'s avatar`)
        .setDescription(`[Avatar URL](${User.dynamicAvatarURL("png", 2048)})`)
        .setImage(msg.mentions[0].dynamicAvatarURL("png", 2048))

        msg.channel.createMessage({ embed: otherEmbed.code });
        }

    }
}