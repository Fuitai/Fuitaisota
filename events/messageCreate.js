const usersDB = require("./../database/schematics/User.js");
const usersGallery = require("./../database/schematics/UserGallery.js");
const serverPrefix = require("./../database/schematics/prefix.js");

module.exports = async (bot, msg) => {
  try {

    if (!msg.channel.guild) return;

    if (msg.mentions) {
      msg.mentions.forEach(async mention => {
        let mentionDB = await usersDB.findOne({ id: mention.id });
        let mentionGallery = await usersGallery.findOne({ id: mention.id });

        if (!mentionDB) {
          // Adding mentioned user into the DB!
          mentionDB = new usersDB({
            id: mention.id,
            registeredAt: Date(),
            usertag: mention.username + "#" + mention.discriminator,
            userID: mention.id,
            dev: false,
            creator: false,
            blacklisted: false,
            blacklistReason: "",
            donationTier: "",
            donator: false,
            donatorSince: "",
            achievements: [],
            achievementsNormal: []
          });
          await mentionDB.save().catch(err => console.log(err));

          // Creating Booru Saves Gallery for the mentioned user into the DB!
          mentionGallery = new usersGallery({
            id: mention.id,
            registeredAt: Date(),
            usertag: mention.username + "#" + mention.discriminator,
            userID: mention.id,
            savesGallery: [],
            nsfwGallery: [],
            usedSlots: 0,
            totalSlots: 15,
            userGalleryPrivate: false,
            nsfwGalleryPrivate: false
          })
          await mentionGallery.save().catch(err => console.log(err));
          console.log(`Succesfully created user ${mention.username}` + "#" + `${mention.discriminator}` + " into the DB!");
        }
      })
    }

    let userDB = await usersDB.findOne({ id: msg.author.id });
    let userGallery = await usersGallery.findOne({ id: msg.author.id });

    if (!userDB) {
      // Adding user into the DB!
      userDB = new usersDB({
        id: msg.author.id,
        registeredAt: Date(),
        usertag: msg.author.username + "#" + msg.author.discriminator,
        userID: msg.author.id,
        dev: false,
        creator: false,
        blacklisted: false,
        blacklistReason: "",
        donationTier: "",
        donator: false,
        donatorSince: "",
        achievements: [],
        achievementsNormal: []
      });
      await userDB.save().catch(err => console.log(err));

      // Creating Booru Saves Gallery for the user into the DB!
      userGallery = new usersGallery({
        id: msg.author.id,
        registeredAt: Date(),
        usertag: msg.author.username + "#" + msg.author.discriminator,
        userID: msg.author.id,
        savesGallery: [],
        nsfwGallery: [],
        usedSlots: 0,
        totalSlots: 15,
        userGalleryPrivate: false,
        nsfwGalleryPrivate: false
      })
      await userGallery.save().catch(err => console.log(err));
      console.log(`Succesfully created user ${msg.author.username}` + "#" + `${msg.author.discriminator}` + " into the DB!");
    }

//Getting the data from the model

  let data = await serverPrefix.findOne({ GuildID: msg.channel.guild.id });

let prefix = data.Prefix;

  if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) prefix = "<";
      
      if (!msg.content.startsWith(prefix)) return;

    if (userDB.blacklisted === true) return msg.addReaction("fdenied:809930225273929748");

    // if (!msg.member) msg.member = await msg.guild.fetchMember(msg);

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command)
      command.run(bot, msg, args);

  }finally{
}
}
