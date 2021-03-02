const { MessageEmbed } = require('helperis');
const ReactionHandler = require('eris-reactions');
const { stripIndents } = require("common-tags");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Ban a member from the server",
    usage: "`<ban <@User | User ID> [Reason]`",
    run: async (bot, msg, args) => {

        let banPerms = msg.channel.guild.members.get(msg.author.id).permission.has("banMembers");
        if (!banPerms) {
            return msg.channel.createMessage("You don't have permissions to do this. You need **Ban Members** permission!");
        }

        let botBanPerms = msg.channel.guild.members.get(bot.user.id).permission.has("banMembers");
        if (!botBanPerms) {
            return msg.channel.createMessage("I don't have permissions to do this. I need **Ban Members** permission! Please contact an administrator of this server~");
        }

        let user = msg.mentions[0];

          let a =  msg.channel.guild.members.get(user.id);

        if (!user) {
            return msg.channel.createMessage("You need to mention or type the ID of the user you want to ban! `<ban <@User | UserID> [Reason]`");
        }

        if (user.id === msg.author.id) {
            return msg.channel.createMessage("You can't ban yourself...");
        }

        if (!a.bannable) {
            return msg.channel.createMessage("<:fnope:809930139957460993>  I can't ban that person due to role hierarchy, I suppose.");
        }

        let reason = args[1];

        if (!reason) {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Are you sure you want to ban <@${user.id}>?\n\n**This verification will become invalid after 30s.**`)
                .setTimestamp()
            let message = await msg.channel.createMessage({ embed: embed.code });
            await message.addReaction("fyep:809930171569930270");
            await message.addReaction("fnope:809930139957460993");

            const reactionListener = new ReactionHandler.continuousReactionStream(
                message,
                (userID) => userID === msg.author.id,
                false,
                { maxMatches: 1, time: 30000 }
            );

            setTimeout(() => {
                msg.channel.createMessage("<:fnope:809930139957460993> `TIMEOUT`")
            }, 30000)

            reactionListener.on('reacted', async (event) => {
                if (event.emoji.name === "fyep") {
                    await message.delete();
                    await msg.channel.guild.banMember(user.id, 0, "No reason specifed.");
                    const embed = new MessageEmbed()
                        .setColor("#ff0000")
                        .setThumbnail(user.dynamicAvatarURL("png", 2048))
                        .setFooter(msg.author.username + "#" + msg.author.discriminator, msg.author.dynamicAvatarURL("png", 2048))
                        .setTimestamp()
                        .setDescription(stripIndents`**> Banned member:** <@${user.id}> (${user.id})
                        **> Banned by:** <@${msg.author.id}> (${msg.author.id})
                        **> Reason:** No reason specifed.`);
                    return msg.channel.createMessage({ embed: embed.code });
                } else if (event.emoji.name === "fnope") {
                    await message.delete();
                    return msg.channel.createMessage("<:fnope:809930139957460993> Operation Cancelled...");
                }
            })

        } else {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`Are you sure you want to ban <@${user.id}>?\n\n**This verification will become invalid after 30s.**`)
                .setTimestamp()
            let message = await msg.channel.createMessage({ embed: embed.code });
            await message.addReaction("fyep:809930171569930270");
            await message.addReaction("fnope:809930139957460993");

            const reactionListener = new ReactionHandler.continuousReactionStream(
                message,
                (userID) => userID === msg.author.id,
                false,
                { maxMatches: 1, time: 30000 }
            );

            reactionListener.on('reacted', async (event) => {
                if (event.emoji.name === "fyep") {
                    await message.delete();
                    await msg.channel.guild.banMember(user.id, 0, args.slice(1).join(" "))
                    const embed = new MessageEmbed()
                        .setColor("#ff0000")
                        .setThumbnail(user.dynamicAvatarURL("png", 2048))
                        .setFooter(msg.author.username + "#" + msg.author.discriminator, msg.author.dynamicAvatarURL("png", 2048))
                        .setTimestamp()
                        .setDescription(stripIndents`**> Banned member:** <@${user.id}> (${user.id})
                    **> Banned by:** <@${msg.author.id}> (${msg.author.id})
                    **> Reason:** ${args.slice(1).join(" ")}`);
                    return msg.channel.createMessage({ embed: embed.code });
                } else if (event.emoji.name === "fnope") {
                    await message.delete();
                    return msg.channel.createMessage("<:fnope:809930139957460993> Operation Cancelled...");
                }
            })
        }
    }
}
