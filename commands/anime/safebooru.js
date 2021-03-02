const { MessageEmbed } = require('helperis');
const Booru = require("booru");
const ReactionHandler = require('eris-reactions');

const usersGallery = require("../../database/schematics/UserGallery.js");
const achievements = require("../../database/schematics/achievements.js");
const usersDB = require("../../database/schematics/User.js");

module.exports = {
    name: "safebooru",
    aliases: ["safe"],
    category: "anime",
    description: "Cute pics from Safebooru\n\n",
    usage: "`&safebooru [tags]`\nFor spacing use `_` :`&safe blue_hair`\nFor multiple tags use `+` :`&safe blue_hair+pointy_ears`\n\nYou can tick the :star: reaction to save results to your Personal Gallery",
    run: async (bot, msg, args) => {

        if (args[0]) {
            Booru.search("safebooru", [args.slice(0).join(' ')], {
                limit: 1,
                random: true
            }).then(async posts => {
                if (posts.length === 0) {
                    msg.channel.createMessage('<:fnope:809930139957460993> No images found... 🙁');
                }
                for (let post of posts) {
                    msg.channel.sendTyping()
                    const embed = new MessageEmbed()
                        .setColor("#ff0080")
                        .setDescription("✈ **Safebooru**\n\n**Tags:** " + "`" + args.slice(0).join(' ') + "`")
                        .setImage(post.fileUrl)
                        .setFooter("| Content provided as-is by Safebooru", msg.author.avatarURL)

                    let message = await msg.channel.createMessage({ embed: embed.code });
                    await message.addReaction("👍");
                    await message.addReaction("👎");
                    await message.addReaction("💖");
                    await message.addReaction("😠");
                    await message.addReaction("⭐");

                    const reactionListener = new ReactionHandler.continuousReactionStream(
                        message,
                        (userID) => userID === msg.author.id,
                        false,
                        { maxMatches: 100, time: 20000 }
                    );


                    reactionListener.on('reacted', async (event) => {
                        if (event.emoji.name === "⭐") {
                            await usersGallery.findOne({ id: msg.author.id }, (err, usedSlots) => {
                                if (err) console.log(err);
                                usedSlots.usedSlots = usedSlots.usedSlots + 1;

                                usedSlots.save().catch(err => console.log(err));
                            });

                            let userDB = await usersDB.findOne({ id: msg.author.id });
                            let achievement = await achievements.findOne({ id: "achievementsdb" });
                            let userGallery = await usersGallery.findOne({ id: msg.author.id });
                            await userGallery.savesGallery.push(post.fileUrl);
                            await userGallery.save().catch(err => console.log(err));
                            msg.channel.createMessage(`Saved by **${msg.author.username}**`);
                            message.removeReactionEmoji("⭐");

                            // achievements
                            if (userGallery.usedSlots > 5000) {
                                if (userDB.achievementsNormal.includes("+5000 Pics Saved!")) {
                                    return;
                                } else {
                                    await userDB.achievements.push({ "achievement": achievement.achievements[9], "achievementEmoji": achievement.raritiesemoji[5], "achievementText": achievement.raritiestext[5] });
                                    await userDB.achievementsNormal.push("+5000 Pics Saved!");
                                    await userDB.save().catch(err => console.log(err));
                                    await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +5000 Pics Saved! ${achievement.raritiesemoji[5]}`);
                                }
                            } else
                                if (userGallery.usedSlots > 1500) {
                                    if (userDB.achievementsNormal.includes("+1500 Pics Saved!")) {
                                        return;
                                    } else {
                                        await userDB.achievements.push({ "achievement": achievement.achievements[8], "achievementEmoji": achievement.raritiesemoji[4], "achievementText": achievement.raritiestext[4] });
                                        await userDB.achievementsNormal.push("+1500 Pics Saved!");
                                        await userDB.save().catch(err => console.log(err));
                                        await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +1500 Pics Saved! ${achievement.raritiesemoji[4]}`);
                                    }
                                } else
                                    if (userGallery.usedSlots > 800) {
                                        if (userDB.achievementsNormal.includes("+800 Pics Saved!")) {
                                            return;
                                        } else {
                                            await userDB.achievements.push({ "achievement": achievement.achievements[7], "achievementEmoji": achievement.raritiesemoji[3], "achievementText": achievement.raritiestext[3] });
                                            await userDB.achievementsNormal.push("+800 Pics Saved!");
                                            await userDB.save().catch(err => console.log(err));
                                            await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +800 Pics Saved! ${achievement.raritiesemoji[3]}`);
                                        }
                                    } else
                                        if (userGallery.usedSlots > 500) {
                                            if (userDB.achievementsNormal.includes("+500 Pics Saved!")) {
                                                return;
                                            } else {
                                                await userDB.achievements.push({ "achievement": achievement.achievements[6], "achievementEmoji": achievement.raritiesemoji[3], "achievementText": achievement.raritiestext[3] });
                                                await userDB.achievementsNormal.push("+500 Pics Saved!");
                                                await userDB.save().catch(err => console.log(err));
                                                await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +500 Pics Saved! ${achievement.raritiesemoji[3]}`);
                                            }
                                        } else
                                            if (userGallery.usedSlots > 250) {
                                                if (userDB.achievementsNormal.includes("+250 Pics Saved!")) {
                                                    return;
                                                } else {
                                                    await userDB.achievements.push({ "achievement": achievement.achievements[5], "achievementEmoji": achievement.raritiesemoji[2], "achievementText": achievement.raritiestext[2] });
                                                    await userDB.achievementsNormal.push("+250 Pics Saved!");
                                                    await userDB.save().catch(err => console.log(err));
                                                    await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +250 Pics Saved! ${achievement.raritiesemoji[2]}`);
                                                }
                                            } else if (userGallery.usedSlots > 150) {
                                                if (userDB.achievementsNormal.includes("+150 Pics Saved!")) {
                                                    return;
                                                } else {
                                                    await userDB.achievements.push({ "achievement": achievement.achievements[4], "achievementEmoji": achievement.raritiesemoji[2], "achievementText": achievement.raritiestext[2] });
                                                    await userDB.achievementsNormal.push("+150 Pics Saved!");
                                                    await userDB.save().catch(err => console.log(err));
                                                    await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +150 Pics Saved! ${achievement.raritiesemoji[2]}`);
                                                }
                                            } else if (userGallery.usedSlots > 100) {
                                                if (userDB.achievementsNormal.includes("+100 Pics Saved!")) {
                                                    return;
                                                } else {
                                                    await userDB.achievements.push({ "achievement": achievement.achievements[3], "achievementEmoji": achievement.raritiesemoji[1], "achievementText": achievement.raritiestext[1] });
                                                    await userDB.achievementsNormal.push("+100 Pics Saved!");
                                                    await userDB.save().catch(err => console.log(err));
                                                    await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +100 Pics Saved! ${achievement.raritiesemoji[1]}`);
                                                }
                                            } else if (userGallery.usedSlots > 80) {
                                                if (userDB.achievementsNormal.includes("+80 Pics Saved!")) {
                                                    return;
                                                } else {
                                                    await userDB.achievements.push({ "achievement": achievement.achievements[2], "achievementEmoji": achievement.raritiesemoji[1], "achievementText": achievement.raritiestext[1] });
                                                    await userDB.achievementsNormal.push("+80 Pics Saved!");
                                                    await userDB.save().catch(err => console.log(err));
                                                    await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +80 Pics Saved! ${achievement.raritiesemoji[1]}`);
                                                }
                                            } else if (userGallery.usedSlots > 50) {
                                                if (userDB.achievementsNormal.includes("+50 Pics Saved!")) {
                                                    return;
                                                } else {
                                                    await userDB.achievements.push({ "achievement": achievement.achievements[1], "achievementEmoji": achievement.raritiesemoji[0], "achievementText": achievement.raritiestext[0] });
                                                    await userDB.achievementsNormal.push("+50 Pics Saved!");
                                                    await userDB.save().catch(err => console.log(err));
                                                    await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +50 Pics Saved! ${achievement.raritiesemoji[0]}`);
                                                }
                                            } else if (userGallery.usedSlots > 25) {
                                                if (userDB.achievementsNormal.includes("+25 Pics Saved!")) {
                                                    return;
                                                } else {
                                                    await userDB.achievements.push({ "achievement": achievement.achievements[0], "achievementEmoji": achievement.raritiesemoji[0], "achievementText": achievement.raritiestext[0] });
                                                    await userDB.achievementsNormal.push("+25 Pics Saved!");
                                                    await userDB.save().catch(err => console.log(err));
                                                    await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +25 Pics Saved! ${achievement.raritiesemoji[0]}`);
                                                }
                                            }
                        }
                    });
                }
            }).catch(err => {
                if (err instanceof BooruError) {
                    // It's a custom error thrown by the package
                    // Typically results from errors the boorus returns, eg. "too many tags"
                    msg.channel.createMessage("<:fnope:809930139957460993> Oh no! Something went wrong...\n" + "```" + err + "```");
                } else {
                    // This means something pretty bad happened
                    msg.channel.createMessage("<:fnope:809930139957460993> Oh no! Something went wrong...\n" + "```" + err + "```");
                }
            })
        } else {
            Booru.search("safebooru", ["waifu"], {
                limit: 1,
                random: true
            })
                .then(async posts => {
                    if (posts.length === 0) {
                        msg.channel.createMessage('<:fnope:809930139957460993> No images found... 🙁');
                    }
                    for (let post of posts) {
                        msg.channel.sendTyping()
                        const embed = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription("✈ **Safebooru**")
                            .setImage(post.fileUrl)
                            .setFooter("| Content provided as-is by Safebooru", msg.author.avatarURL)

                        let message = await msg.channel.createMessage({ embed: embed.code });
                        await message.addReaction("👍");
                        await message.addReaction("👎");
                        await message.addReaction("💖");
                        await message.addReaction("😠");
                        await message.addReaction("⭐");

                        const reactionListener = new ReactionHandler.continuousReactionStream(
                            message,
                            (userID) => userID === msg.author.id,
                            false,
                            { maxMatches: 100, time: 20000 }
                        );

                        reactionListener.on('reacted', async (event) => {
                            if (event.emoji.name === "⭐") {
                                await usersGallery.findOne({ id: msg.author.id }, (err, usedSlots) => {
                                    if (err) console.log(err);
                                    usedSlots.usedSlots = usedSlots.usedSlots + 1;

                                    usedSlots.save().catch(err => console.log(err));
                                });

                                let userDB = await usersDB.findOne({ id: msg.author.id });
                                let achievement = await achievements.findOne({ id: "achievementsdb" });
                                let userGallery = await usersGallery.findOne({ id: msg.author.id });
                                await userGallery.savesGallery.push(post.fileUrl);
                                await userGallery.save().catch(err => console.log(err));
                                msg.channel.createMessage(`Saved by **${msg.author.username}**`);
                                message.removeReactionEmoji("⭐");

                                // achievements
                                if (userGallery.usedSlots > 5000) {
                                    if (userDB.achievementsNormal.includes("+5000 Pics Saved!")) {
                                        return;
                                    } else {
                                        await userDB.achievements.push({ "achievement": achievement.achievements[9], "achievementEmoji": achievement.raritiesemoji[5], "achievementText": achievement.raritiestext[5] });
                                        await userDB.achievementsNormal.push("+5000 Pics Saved!");
                                        await userDB.save().catch(err => console.log(err));
                                        await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +5000 Pics Saved! ${achievement.raritiesemoji[5]}`);
                                    }
                                } else
                                    if (userGallery.usedSlots > 1500) {
                                        if (userDB.achievementsNormal.includes("+1500 Pics Saved!")) {
                                            return;
                                        } else {
                                            await userDB.achievements.push({ "achievement": achievement.achievements[8], "achievementEmoji": achievement.raritiesemoji[4], "achievementText": achievement.raritiestext[4] });
                                            await userDB.achievementsNormal.push("+1500 Pics Saved!");
                                            await userDB.save().catch(err => console.log(err));
                                            await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +1500 Pics Saved! ${achievement.raritiesemoji[4]}`);
                                        }
                                    } else
                                        if (userGallery.usedSlots > 800) {
                                            if (userDB.achievementsNormal.includes("+800 Pics Saved!")) {
                                                return;
                                            } else {
                                                await userDB.achievements.push({ "achievement": achievement.achievements[7], "achievementEmoji": achievement.raritiesemoji[3], "achievementText": achievement.raritiestext[3] });
                                                await userDB.achievementsNormal.push("+800 Pics Saved!");
                                                await userDB.save().catch(err => console.log(err));
                                                await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +800 Pics Saved! ${achievement.raritiesemoji[3]}`);
                                            }
                                        } else
                                            if (userGallery.usedSlots > 500) {
                                                if (userDB.achievementsNormal.includes("+500 Pics Saved!")) {
                                                    return;
                                                } else {
                                                    await userDB.achievements.push({ "achievement": achievement.achievements[6], "achievementEmoji": achievement.raritiesemoji[3], "achievementText": achievement.raritiestext[3] });
                                                    await userDB.achievementsNormal.push("+500 Pics Saved!");
                                                    await userDB.save().catch(err => console.log(err));
                                                    await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +500 Pics Saved! ${achievement.raritiesemoji[3]}`);
                                                }
                                            } else
                                                if (userGallery.usedSlots > 250) {
                                                    if (userDB.achievementsNormal.includes("+250 Pics Saved!")) {
                                                        return;
                                                    } else {
                                                        await userDB.achievements.push({ "achievement": achievement.achievements[5], "achievementEmoji": achievement.raritiesemoji[2], "achievementText": achievement.raritiestext[2] });
                                                        await userDB.achievementsNormal.push("+250 Pics Saved!");
                                                        await userDB.save().catch(err => console.log(err));
                                                        await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +250 Pics Saved! ${achievement.raritiesemoji[2]}`);
                                                    }
                                                } else if (userGallery.usedSlots > 150) {
                                                    if (userDB.achievementsNormal.includes("+150 Pics Saved!")) {
                                                        return;
                                                    } else {
                                                        await userDB.achievements.push({ "achievement": achievement.achievements[4], "achievementEmoji": achievement.raritiesemoji[2], "achievementText": achievement.raritiestext[2] });
                                                        await userDB.achievementsNormal.push("+150 Pics Saved!");
                                                        await userDB.save().catch(err => console.log(err));
                                                        await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +150 Pics Saved! ${achievement.raritiesemoji[2]}`);
                                                    }
                                                } else if (userGallery.usedSlots > 100) {
                                                    if (userDB.achievementsNormal.includes("+100 Pics Saved!")) {
                                                        return;
                                                    } else {
                                                        await userDB.achievements.push({ "achievement": achievement.achievements[3], "achievementEmoji": achievement.raritiesemoji[1], "achievementText": achievement.raritiestext[1] });
                                                        await userDB.achievementsNormal.push("+100 Pics Saved!");
                                                        await userDB.save().catch(err => console.log(err));
                                                        await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +100 Pics Saved! ${achievement.raritiesemoji[1]}`);
                                                    }
                                                } else if (userGallery.usedSlots > 80) {
                                                    if (userDB.achievementsNormal.includes("+80 Pics Saved!")) {
                                                        return;
                                                    } else {
                                                        await userDB.achievements.push({ "achievement": achievement.achievements[2], "achievementEmoji": achievement.raritiesemoji[1], "achievementText": achievement.raritiestext[1] });
                                                        await userDB.achievementsNormal.push("+80 Pics Saved!");
                                                        await userDB.save().catch(err => console.log(err));
                                                        await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +80 Pics Saved! ${achievement.raritiesemoji[1]}`);
                                                    }
                                                } else if (userGallery.usedSlots > 50) {
                                                    if (userDB.achievementsNormal.includes("+50 Pics Saved!")) {
                                                        return;
                                                    } else {
                                                        await userDB.achievements.push({ "achievement": achievement.achievements[1], "achievementEmoji": achievement.raritiesemoji[0], "achievementText": achievement.raritiestext[0] });
                                                        await userDB.achievementsNormal.push("+50 Pics Saved!");
                                                        await userDB.save().catch(err => console.log(err));
                                                        await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +50 Pics Saved! ${achievement.raritiesemoji[0]}`);
                                                    }
                                                } else if (userGallery.usedSlots > 25) {
                                                    if (userDB.achievementsNormal.includes("+25 Pics Saved!")) {
                                                        return;
                                                    } else {
                                                        await userDB.achievements.push({ "achievement": achievement.achievements[0], "achievementEmoji": achievement.raritiesemoji[0], "achievementText": achievement.raritiestext[0] });
                                                        await userDB.achievementsNormal.push("+25 Pics Saved!");
                                                        await userDB.save().catch(err => console.log(err));
                                                        await msg.channel.createMessage(`<@${msg.author.id}>, **New Achievement!** | +25 Pics Saved! ${achievement.raritiesemoji[0]}`);
                                                    }
                                                }
                            }
                        });
                    }
                }).catch(err => {
                    if (err instanceof BooruError) {
                        // It's a custom error thrown by the package
                        // Typically results from errors the boorus returns, eg. "too many tags"
                        msg.channel.createMessage("<:fnope:809930139957460993> Oh no! Something went wrong...\n" + "```" + err + "```");
                    } else {
                        // This means something pretty bad happened
                        msg.channel.createMessage("<:fnope:809930139957460993> Oh no! Something went wrong...\n" + "```" + err + "```");
                    }
                })
        }
    }
}