const { MessageEmbed } = require('helperis');
const ReactionHandler = require('eris-reactions');

const usersGallery = require("../../database/schematics/UserGallery.js");

module.exports = {
    name: "gallery",
    category: "anime",
    description: "Gallery\n\n",
    usage: "`&gallery [User]` | `&gallery [User] nsfw` | `&gallery [User] search sfw <Image Number>` | `&gallery [User] search nsfw <Image Number>` | `&gallery set sfw <public | private>` | `&gallery set nsfw <public | private>`\n\n`nsfw` - NSFW Gallery.\n`search` - Search an specific image from the gallery sfw or nsfw with the number of the image.\n`set` - Set any of you galleries (sfw or nsfw) public or private.",
    run: async (bot, msg, args) => {

        let mention = msg.mentions[0];

        if (mention) {

            let userGallery = await usersGallery.findOne({ id: mention.id });

            if (args[1] === "nsfw") {
                if (!msg.channel.nsfw) return msg.channel.createMessage(`<:fnope:809930139957460993> This channel isn't set as NSFW. Don't go leaving your "artwork" everywhere.`);

                if (userGallery.nsfwGalleryPrivate !== false) return msg.channel.createMessage("<:fdenied:809930225273929748> Sorry but this user's NSFW Gallery is private...");
                if (typeof userGallery.nsfwGallery[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> This user's gallery is empty, you can save images on your gallery by reacting with '⭐' on commands such as... `airwaifu`, `maidpic`, `neko`, `safebooru`");

                let image = userGallery.nsfwGallery[0];

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`✈ **${mention.username}'s NSFW Gallery**\n\nImage: **0/${userGallery.nsfwGallery.length - 1}**`)
                    .setImage(image)
                    .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)

                let message = await msg.channel.createMessage({ embed: embed.code });
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
                        let result = Math.floor((Math.random() * userGallery.nsfwGallery.length));
                        const embed2 = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`✈ **${mention.username}'s NSFW Gallery**\n\nImage: **${result}/${userGallery.nsfwGallery.length - 1}**`)
                            .setImage(userGallery.nsfwGallery[result])
                            .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)
                        message.edit({ embed: embed2.code });
                        message.removeReaction("◀", msg.author.id);
                    } else if (event.emoji.name === "▶") {
                        let result = Math.floor((Math.random() * userGallery.nsfwGallery.length));
                        const embed2 = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`✈ **${mention.username}'s NSFW Gallery**\n\nImage: **${result}/${userGallery.nsfwGallery.length - 1}**`)
                            .setImage(userGallery.nsfwGallery[result])
                            .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)
                        message.edit({ embed: embed2.code });
                        message.removeReaction("▶", msg.author.id);
                    } else if (event.emoji.name === "⏹") {
                        await message.removeReactionEmoji("⏹");
                        await message.removeReactionEmoji("▶");
                        return message.removeReactionEmoji("◀");
                    }
                });
            } else if (args[1] === "search") {
                if (args[2] === "nsfw") {
                    let image = args[3];
                    if (!msg.channel.nsfw) return msg.channel.createMessage(`<:fnope:809930139957460993> This channel isn't set as NSFW. Please try again on a NSFW Channel.`);
                    if (userGallery.nsfwGalleryPrivate !== false) return msg.channel.createMessage("<:fdenied:809930225273929748> Sorry but this user's NSFW Gallery is private...");
                    if (typeof userGallery.nsfwGallery[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> This user's gallery is empty, you can save images on your gallery by reacting with '⭐' on commands such as... `airwaifu`, `maidpic`, `neko`, `safebooru`");
                    if (!image) return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify the Image Number of the image you want to see from this user's NSFW Gallery!");
                    if (isNaN(image)) return msg.channel.createMessage("<:fnope:809930139957460993> That is not a valid Image Number!");

                    if (image > userGallery.nsfwGallery.length) return msg.channel.createMessage(`<:fnope:809930139957460993> Could not find Image Number: "**${args[3]}**" on this user's NSFW Gallery... 🙁`);

                    msg.channel.sendTyping()
                    const embed = new MessageEmbed()
                        .setColor("#ff0080")
                        .setDescription(`✈ **${mention.username}'s NSFW Gallery**\n\nImage: **${image}/${userGallery.nsfwGallery.length - 1}**`)
                        .setImage(userGallery.nsfwGallery[image])
                        .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)

                    return msg.channel.createMessage({ embed: embed.code });
                } else if (args[2] === "sfw") {
                    let image = args[3];
                    if (userGallery.userGalleryPrivate !== false) return msg.channel.createMessage("<:fdenied:809930225273929748> Sorry but this user's Gallery is private...");
                    if (typeof userGallery.savesGallery[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> This user's gallery is empty, you can save images on your gallery by reacting with '⭐' on commands such as... `airwaifu`, `maidpic`, `neko`, `safebooru`");
                    if (!image) return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify the Image Number of the image you want to see from this user's Gallery!");
                    if (isNaN(image)) return msg.channel.createMessage("<:fnope:809930139957460993> That is not a valid Image Number!");

                    if (image > userGallery.savesGallery.length) return msg.channel.createMessage(`<:fnope:809930139957460993> Could not find Image Number: "**${args[3]}**" on this user's Gallery... 🙁`);

                    msg.channel.sendTyping()
                    const embed = new MessageEmbed()
                        .setColor("#ff0080")
                        .setDescription(`✈ **${mention.username}'s Gallery**\n\nImage: **${image}/${userGallery.savesGallery.length - 1}**`)
                        .setImage(userGallery.savesGallery[image])
                        .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)

                    return msg.channel.createMessage({ embed: embed.code });
                } else {
                    return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify in what gallery you want to search the image (sfw or nsfw)! `&gallery [User] search < sfw | nsfw > <Image Number>`");
                }
            }
            else {
                if (userGallery.userGalleryPrivate !== false) return msg.channel.createMessage("<:fdenied:809930225273929748> Sorry but this user's Gallery is private...");
                if (typeof userGallery.savesGallery[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> This user's gallery is empty, you can save images on your gallery by reacting with '⭐' on commands such as... `airwaifu`, `maidpic`, `neko`, `safebooru`");

                let image = userGallery.savesGallery[0];

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`✈ **${mention.username}'s Gallery**\n\nImage: **0/${userGallery.savesGallery.length - 1}**`)
                    .setImage(image)
                    .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)

                let message = await msg.channel.createMessage({ embed: embed.code });
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
                        let result = Math.floor((Math.random() * userGallery.savesGallery.length));
                        const embed2 = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`✈ **${mention.username}'s Gallery**\n\nImage: **${result}/${userGallery.savesGallery.length - 1}**`)
                            .setImage(userGallery.savesGallery[result])
                            .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)
                        message.edit({ embed: embed2.code });
                        message.removeReaction("◀", msg.author.id);
                    } else if (event.emoji.name === "▶") {
                        let result = Math.floor((Math.random() * userGallery.savesGallery.length));
                        const embed2 = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`✈ **${mention.username}'s Gallery**\n\nImage: **${result}/${userGallery.savesGallery.length - 1}**`)
                            .setImage(userGallery.savesGallery[result])
                            .setFooter(`${mention.username}#${mention.discriminator}`, mention.avatarURL)
                        message.edit({ embed: embed2.code });
                        message.removeReaction("▶", msg.author.id);
                    } else if (event.emoji.name === "⏹") {
                        await message.removeReactionEmoji("⏹");
                        await message.removeReactionEmoji("▶");
                        return message.removeReactionEmoji("◀");
                    }
                });
            }
        } else {
            let userGallery = await usersGallery.findOne({ id: msg.author.id });

            if (args[0] === "nsfw") {
                if (!msg.channel.nsfw) return msg.channel.createMessage(`<:fnope:809930139957460993> This channel isn't set as NSFW. Don't go leaving your "artwork" everywhere.`)

                if (typeof userGallery.nsfwGallery[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> Your gallery is empty, you can save images on your gallery by reacting with '⭐' on commands such as... `airwaifu`, `maidpic`, `neko`, `safebooru`");

                let image = userGallery.nsfwGallery[0];

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`✈ **${msg.author.username}'s NSFW Gallery**\n\nImage: **0/${userGallery.nsfwGallery.length - 1}**`)
                    .setImage(image)
                    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)

                let message = await msg.channel.createMessage({ embed: embed.code });
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
                        let result = Math.floor((Math.random() * userGallery.nsfwGallery.length - 1));
                        const embed2 = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`✈ **${msg.author.username}'s NSFW Gallery**\n\nImage: **${result}/${userGallery.nsfwGallery.length - 1}**`)
                            .setImage(userGallery.nsfwGallery[result])
                            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                        message.edit({ embed: embed2.code });
                        message.removeReaction("◀", msg.author.id);
                    } else if (event.emoji.name === "▶") {
                        let result = Math.floor((Math.random() * userGallery.nsfwGallery.length));
                        const embed2 = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`✈ **${msg.author.username}'s NSFW Gallery**\n\nImage: **${result}/${userGallery.nsfwGallery.length - 1}**`)
                            .setImage(userGallery.nsfwGallery[result])
                            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                        message.edit({ embed: embed2.code });
                        message.removeReaction("▶", msg.author.id);
                    } else if (event.emoji.name === "⏹") {
                        await message.removeReactionEmoji("⏹");
                        await message.removeReactionEmoji("▶");
                        return message.removeReactionEmoji("◀");
                    }
                });
            } else if (args[0] === "search") {
                if (args[1] === "nsfw") {
                    let image = args[2];
                    if (!msg.channel.nsfw) return msg.channel.createMessage(`<:fnope:809930139957460993> This channel isn't set as NSFW. Don't go leaving your "artwork" everywhere.`);
                    if (typeof userGallery.nsfwGallery[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> Your gallery is empty, you can save images on your gallery by reacting with '⭐' on commands such as... `airwaifu`, `maidpic`, `neko`, `safebooru`");
                    if (!image) return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify the Image Number of the image you want to see from your NSFW Gallery!");
                    if (isNaN(image)) return msg.channel.createMessage("<:fnope:809930139957460993> That is not a valid Image Number!");

                    if (image > userGallery.nsfwGallery.length) return msg.channel.createMessage(`<:fnope:809930139957460993> Could not find Image Number: "**${args[2]}**" on your NSFW Gallery... 🙁`);

                    msg.channel.sendTyping()
                    const embed = new MessageEmbed()
                        .setColor("#ff0080")
                        .setDescription(`✈ **${msg.author.username}'s NSFW Gallery**\n\nImage: **${image}/${userGallery.nsfwGallery.length - 1}**`)
                        .setImage(userGallery.nsfwGallery[image])
                        .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)

                    return msg.channel.createMessage({ embed: embed.code });
                } else if (args[1] === "sfw") {
                    let image = args[2];
                    if (typeof userGallery.savesGallery[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> Your gallery is empty, you can save images on your gallery by reacting with '⭐' on commands such as... `airwaifu`, `maidpic`, `neko`, `safebooru`");
                    if (!image) return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify the Image Number of the image you want to see from your Gallery!");
                    if (isNaN(image)) return msg.channel.createMessage("<:fnope:809930139957460993> That is not a valid Image Number!");

                    if (image > userGallery.savesGallery.length) return msg.channel.createMessage(`<:fnope:809930139957460993> Could not find Image Number: "**${args[2]}**" on your Gallery... 🙁`);

                    msg.channel.sendTyping()
                    const embed = new MessageEmbed()
                        .setColor("#ff0080")
                        .setDescription(`✈ **${msg.author.username}'s Gallery**\n\nImage: **${image}/${userGallery.savesGallery.length - 1}**`)
                        .setImage(userGallery.savesGallery[image])
                        .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)

                    return msg.channel.createMessage({ embed: embed.code });
                } else {
                    return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify in what gallery you want to search the image (sfw or nsfw)! `&gallery [User] search < sfw | nsfw > <Image Number>`");
                }
            } else if (args[0] === "set") {
                if (args[1] === "nsfw") {
                    let value = args[2];
                    if (!value) return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify what do you want to do with your NSFW Gallery! Set it public or private? `&gallery set <sfw | nsfw> <public | private>`");

                    if (value === "public") {
                        if (userGallery.nsfwGalleryPrivate !== false) {
                            msg.channel.sendTyping()
                            const embed = new MessageEmbed()
                                .setColor("#ff0080")
                                .setDescription(`✈ **${msg.author.username}'s NSFW Gallery**\n\nAre you sure do you want to make your NSFW Gallery public?\n\nReact with <:fyep:809930171569930270> to set your NSFW Gallery public!\nReact with <:fnope:809930139957460993> to Cancel!\n\n**This verification will become invalid after 30s.**`)
                                .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
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
                                    userGallery.nsfwGalleryPrivate = false
                                    await userGallery.save().catch(err => console.log(err));
                                    await message.delete();
                                    return msg.channel.createMessage("<:fyep:809930171569930270> All done! Your NSFW Gallery has been set to **public**! You can set it to private again with this same command, just **use 'private' instead of 'public'**. `&gallery set <sfw | nsfw> <public | private>`");
                                } else if (event.emoji.name === "fnope") {
                                    await message.delete();
                                    return msg.channel.createMessage("<:fnope:809930139957460993> Operation Cancelled...");
                                }
                            })
                        } else {
                            return msg.channel.createMessage("<:fnope:809930139957460993> Your NSFW Gallery is already public! You may want to set it Private maybe? `&gallery set <sfw | nsfw> <public | private>`");
                        }
                    } else if (value === "private") {
                        if (userGallery.nsfwGalleryPrivate === false) {
                            msg.channel.sendTyping()
                            const embed = new MessageEmbed()
                                .setColor("#ff0080")
                                .setDescription(`✈ **${msg.author.username}'s NSFW Gallery**\n\nAre you sure do you want to make your NSFW Gallery private?\n\n*By doing this other people will not be able to see your NSFW Gallery if they mention you with the command*\n\nReact with <:fyep:809930171569930270> to set your NSFW Gallery private!\nReact with <:fnope:809930139957460993> to Cancel!\n\n**This verification will become invalid after 30s.**`)
                                .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
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
                                    userGallery.nsfwGalleryPrivate = true
                                    await userGallery.save().catch(err => console.log(err));
                                    await message.delete();
                                    return msg.channel.createMessage("<:fyep:809930171569930270> All done! Your NSFW Gallery has been set to **private**! You can set it to public again with this same command, just **use 'public' instead of 'private'**. `&gallery set <sfw | nsfw> <public | private>`");
                                } else if (event.emoji.name === "fnope") {
                                    await message.delete();
                                    return msg.channel.createMessage("<:fnope:809930139957460993> Operation Cancelled...");
                                }
                            })
                        } else {
                            return msg.channel.createMessage("<:fnope:809930139957460993> Your NSFW Gallery is already private! You may want to set it Public maybe? `&gallery set <sfw | nsfw> <public | private>`");
                        }
                    } else {
                        return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify what do you want to do with your NSFW Gallery! Set it public or private? `&gallery set <sfw | nsfw> <public | private>`");
                    }
                } else if (args[1] === "sfw") {
                    let value = args[2];
                    if (!value) return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify what do you want to do with your Gallery! Set it public or private? `&gallery set <sfw | nsfw> <public | private>`");

                    if (value === "public") {
                        if (userGallery.userGalleryPrivate !== false) {
                            msg.channel.sendTyping()
                            const embed = new MessageEmbed()
                                .setColor("#ff0080")
                                .setDescription(`✈ **${msg.author.username}'s Gallery**\n\nAre you sure do you want to make your Gallery public?\n\nReact with <:fyep:809930171569930270> to set your Gallery public!\nReact with <:fnope:809930139957460993> to Cancel!\n\n**This verification will become invalid after 30s.**`)
                                .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
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
                                    userGallery.userGalleryPrivate = false
                                    await userGallery.save().catch(err => console.log(err));
                                    await message.delete();
                                    return msg.channel.createMessage("<:fyep:809930171569930270> All done! Your Gallery has been set to **public**! You can set it to private again with this same command, just **use 'private' instead of 'public'**. `&gallery set <sfw | nsfw> <public | private>`");
                                } else if (event.emoji.name === "fnope") {
                                    await message.delete();
                                    return msg.channel.createMessage("<:fnope:809930139957460993> Operation Cancelled...");
                                }
                            })
                        } else {
                            return msg.channel.createMessage("<:fnope:809930139957460993> Your Gallery is already public! You may want to set it Private maybe? `&gallery set <sfw | nsfw> <public | private>`");
                        }
                    } else if (value === "private") {
                        if (userGallery.userGalleryPrivate === false) {
                            msg.channel.sendTyping()
                            const embed = new MessageEmbed()
                                .setColor("#ff0080")
                                .setDescription(`✈ **${msg.author.username}'s Gallery**\n\nAre you sure do you want to make your Gallery private?\n\n*By doing this other people will not be able to see your Gallery if they mention you with the command*\n\nReact with <:fyep:809930171569930270> to set your Gallery private!\nReact with <:fnope:809930139957460993> to Cancel!\n\n**This verification will become invalid after 30s.**`)
                                .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
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
                                    userGallery.userGalleryPrivate = true
                                    await userGallery.save().catch(err => console.log(err));
                                    await message.delete();
                                    return msg.channel.createMessage("<:fyep:809930171569930270> All done! Your Gallery has been set to **private**! You can set it to public again with this same command, just **use 'public' instead of 'private'**. `&gallery set <sfw | nsfw> <public | private>`");
                                } else if (event.emoji.name === "fnope") {
                                    await message.delete();
                                    return msg.channel.createMessage("<:fnope:809930139957460993> Operation Cancelled...");
                                }
                            })
                        } else {
                            return msg.channel.createMessage("<:fnope:809930139957460993> Your Gallery is already private! You may want to set it Public maybe? `&gallery set <sfw | nsfw> <public | private>`");
                        }
                    } else {
                            return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify what do you want to do with your NSFW Gallery! Set it public or private? `&gallery set <sfw | nsfw> <public | private>`");
                    }
                } else {
                    return msg.channel.createMessage("<:fnope:809930139957460993> You need to specify what gallery do you want to set public or private! **SFW or NSFW** `&gallery set <sfw | nsfw> <public | private>`");
                }
            }
            else {
                if (typeof userGallery.savesGallery[0] == "undefined") return msg.channel.createMessage("<:fnope:809930139957460993> Your gallery is empty, you can save images on your gallery by reacting with '⭐' on commands such as... `airwaifu`, `maidpic`, `neko`, `safebooru`");

                let image = userGallery.savesGallery[0];

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`✈ **${msg.author.username}'s Gallery**\n\nImage: **0/${userGallery.savesGallery.length - 1}**`)
                    .setImage(image)
                    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)

                let message = await msg.channel.createMessage({ embed: embed.code });
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
                        let result = Math.floor((Math.random() * userGallery.savesGallery.length));
                        const embed2 = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`✈ **${msg.author.username}'s Gallery**\n\nImage: **${result}/${userGallery.savesGallery.length - 1}**`)
                            .setImage(userGallery.savesGallery[result])
                            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                        message.edit({ embed: embed2.code });
                        message.removeReaction("◀", msg.author.id);
                    } else if (event.emoji.name === "▶") {
                        let result = Math.floor((Math.random() * userGallery.savesGallery.length));
                        const embed2 = new MessageEmbed()
                            .setColor("#ff0080")
                            .setDescription(`✈ **${msg.author.username}'s Gallery**\n\nImage: **${result}/${userGallery.savesGallery.length - 1}**`)
                            .setImage(userGallery.savesGallery[result])
                            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                        message.edit({ embed: embed2.code });
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