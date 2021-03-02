const { MessageEmbed } = require('helperis');
const ReactionHandler = require('eris-reactions');

const usersDB = require("../../database/schematics/User.js");
const achievesa = require("../../database/schematics/achievements.js");

module.exports = {
    name: "achievements",
    category: "Info",
    description: "See yours or someone else achievements!\n\n",
    usage: "`&achievements [User]` | `&achievements [User] search <Achievement Number>`",
    run: async (bot, msg, args) => {

        let mention = msg.mentions[0];

        if (mention) {

            let userDB = await usersDB.findOne({ id: mention.id });
            let achieves = await achievesa.findOne({ id: "achievementsdb" });

            if (args[1] === "search") {
                let achievementNumber = args[2];
                if (!achievementNumber) return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify the number of the achievemnt you wanna see! `&achievements [User] search <Achievement Number>`");
                if (isNaN(achievementNumber)) return msg.channel.createMessage("<:fnope:809930139957460993> That is not a valid Number!");

                let resulta = achievementNumber - 1;

                if (typeof userDB.achievements[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> This user doesn't have any achievements yet...");
                if (resulta < 0) return msg.channel.createMessage("<:fnope:809930139957460993> That is not a valid Number!");

                if (achievementNumber > userDB.achievements.length) return msg.channel.createMessage(`<:fnope:809930139957460993> Could not find Achievement Number: "**${achievementNumber}**" on this user's Achievements... 🙁`);

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`☯ **${mention.username}'s Achievements**\n\nAchievements Completition: **${userDB.achievements.length}/${achieves.achievements.length}**\nAchievement: **${achievementNumber}/${userDB.achievements.length}**\n\n- **${userDB.achievements[resulta].achievement}**\nRarity: ${userDB.achievements[resulta].achievementEmoji}`)
                    .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)
                    .setTimestamp()
                msg.channel.createMessage({ embed: embed.code });
            } else {
                if (typeof userDB.achievements[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> This user doesn't have any achievements yet...");

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`☯ **${mention.username}'s Achievements**\n\nAchievements Completition: **${userDB.achievements.length}/${achieves.achievements.length}**\nAchievement: **1/${userDB.achievements.length}**\n\n- **${userDB.achievements[0].achievement}**\nRarity: ${userDB.achievements[0].achievementEmoji}`)
                    .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)
                    .setTimestamp()
                let message = await msg.channel.createMessage({ embed: embed.code })
                await message.addReaction("◀");
                await message.addReaction("⏹");
                await message.addReaction("▶");

                const reactionListener = new ReactionHandler.continuousReactionStream(
                    message,
                    (userID) => userID === msg.author.id,
                    false,
                    { maxMatches: 10000, time: 3600000 }
                );

                reactionListener.on('reacted', async (event) => {
                    if (event.emoji.name === "◀") {
                        let result = Math.floor((Math.random() * userDB.achievements.length));
                        const embed = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`☯ **${mention.username}'s Achievements**\n\nAchievements Completition: **${userDB.achievements.length}/${achieves.achievements.length}**\nAchievement: **${result + 1}/${userDB.achievements.length}**\n\n- **${userDB.achievements[result].achievement}**\nRarity: ${userDB.achievements[result].achievementEmoji}`)
                            .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)
                            .setTimestamp()
                        message.edit({ embed: embed.code });
                        message.removeReaction("◀", msg.author.id);
                    } else if (event.emoji.name === "▶") {
                        let result = Math.floor((Math.random() * userDB.achievements.length));
                        const embed = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`☯ **${mention.username}'s Achievements**\n\nAchievements Completition: **${userDB.achievements.length}/${achieves.achievements.length}**\nAchievement: **${result + 1}/${userDB.achievements.length}**\n\n- **${userDB.achievements[result].achievement}**\nRarity: ${userDB.achievements[result].achievementEmoji}`)
                            .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)
                            .setTimestamp()
                        message.edit({ embed: embed.code });
                        message.removeReaction("▶", msg.author.id);
                    } else if (event.emoji.name === "⏹") {
                        await message.removeReactionEmoji("⏹");
                        await message.removeReactionEmoji("▶");
                        return message.removeReactionEmoji("◀");
                    }
                });
            }
        } else {
            let userDB = await usersDB.findOne({ id: msg.author.id });
            let achieves = await achievesa.findOne({ id: "achievementsdb" });

            if (args[0] === "search") {
                let achievementNumber = args[1];
                if (!achievementNumber) return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify the number of the achievemnt you wanna see! `&achievements [User] search <Achievement Number>`");
                if (isNaN(achievementNumber)) return msg.channel.createMessage("<:fnope:809930139957460993> That is not a valid Number!");

                if (typeof userDB.achievements[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> You don't have any achievements yet...");

                let resulta = achievementNumber - 1;

                if (achievementNumber > userDB.achievements.length) return msg.channel.createMessage(`<:fnope:809930139957460993> Could not find Achievement Number: "**${achievementNumber}**" on your Achievements... 🙁`);
                if (resulta < 0) return msg.channel.createMessage("<:fnope:809930139957460993> That is not a valid Number!");

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`☯ **${msg.author.username}'s Achievements**\n\nAchievements Completition: **${userDB.achievements.length}/${achieves.achievements.length}**\nAchievement: **${achievementNumber}/${userDB.achievements.length}**\n\n- **${userDB.achievements[resulta].achievement}**\nRarity: ${userDB.achievements[resulta].achievementEmoji}`)
                    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                    .setTimestamp()
                msg.channel.createMessage({ embed: embed.code });
            } else {
                if (typeof userDB.achievements[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> This user doesn't have any achievements yet...");

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`☯ **${msg.author.username}'s Achievements**\n\nAchievements Completition: **${userDB.achievements.length}/${achieves.achievements.length}**\nAchievement: **1/${userDB.achievements.length}**\n\n- **${userDB.achievements[0].achievement}**\nRarity: ${userDB.achievements[0].achievementEmoji}`)
                    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                    .setTimestamp()
                let message = await msg.channel.createMessage({ embed: embed.code })
                await message.addReaction("◀");
                await message.addReaction("⏹");
                await message.addReaction("▶");

                const reactionListener = new ReactionHandler.continuousReactionStream(
                    message,
                    (userID) => userID === msg.author.id,
                    false,
                    { maxMatches: 10000, time: 3600000 }
                );

                reactionListener.on('reacted', async (event) => {
                    if (event.emoji.name === "◀") {
                        let result = Math.floor((Math.random() * userDB.achievements.length));
                        const embed = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`☯ **${msg.author.username}'s Achievements**\n\nAchievements Completition: **${userDB.achievements.length}/${achieves.achievements.length}**\nAchievement: **${result + 1}/${userDB.achievements.length}**\n\n- **${userDB.achievements[result].achievement}**\nRarity: ${userDB.achievements[result].achievementEmoji}`)
                            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                            .setTimestamp()
                        message.edit({ embed: embed.code });
                        message.removeReaction("◀", msg.author.id);
                    } else if (event.emoji.name === "▶") {
                        let result = Math.floor((Math.random() * userDB.achievements.length));
                        const embed = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`☯ **${msg.author.username}'s Achievements**\n\nAchievements Completition: **${userDB.achievements.length}/${achieves.achievements.length}**\nAchievement: **${result + 1}/${userDB.achievements.length}**\n\n- **${userDB.achievements[result].achievement}**\nRarity: ${userDB.achievements[result].achievementEmoji}`)
                            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                            .setTimestamp()
                        message.edit({ embed: embed.code });
                        message.removeReaction("▶", msg.author.id);
                    } else if (event.emoji.name === "⏹") {
                        await message.removeReactionEmoji("⏹");
                        await message.removeReactionEmoji("▶");
                        return message.removeReactionEmoji("◀");
                    }
                });
            }
        }
    }
}