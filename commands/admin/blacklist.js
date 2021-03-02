const { MessageEmbed } = require('helperis');

const usersDB = require("../../database/schematics/User.js");

module.exports = {
  name: "blacklist",
  category: "admin",
  description: "Add or Remove a user into the blacklist",
  usage: "`&blacklist < add | remove > <user ID> <Reason>`",
  run: async (bot, msg, args) => {

    let userDB = await usersDB.findOne({ id: msg.author.id });

    if (userDB.dev === false) return msg.addReaction("fdenied:809930225273929748");

    //  if (msg.author.id !== '610887342009483277') return msg.addReaction("fdenied:809930225273929748");

    if (args[0] === "add") {

      if (!args[1]) return msg.addReaction("fnope:809930139957460993");

      if (isNaN(args[1])) return msg.channel.createMessage("<:fnope:809930139957460993> Please input a valid user ID!");

      let member = msg.channel.guild.members.get(args[1]);

      if (!member) return msg.addReaction("fnope:809930139957460993");

      if (member.id === msg.author.id) return msg.addReaction("fdenied:809930225273929748");

      if (member.id === bot.user.id) return msg.channel.createMessage("Why do you want me to add my self into the blacklist? Maybe you want me to add yourself into the blacklist to see if you like it?");

      if (!args[2]) return msg.addReaction("fnope:809930139957460993");

      let memberDB = await usersDB.findOne({ id: member.id });

      if (!memberDB) return msg.channel.createMessage("<:fnope:809930139957460993> That user is not registered on the DB!");

      if (memberDB.blacklisted !== false) {
        await msg.addReaction("fnope:809930139957460993");
        return msg.channel.createMessage("<:fnope:809930139957460993> ```ERR: USER_ALREADY_IN_DB```");
      }

      memberDB.blacklisted = true
      memberDB.blacklistReason = args.slice(2).join(' ')
      await memberDB.save().catch(err => console.log(err));
      return msg.addReaction("fyep:809930171569930270");
    }

    else if (args[0] === "remove") {
      if (!args[1]) return msg.addReaction("fnope:809930139957460993");

      if (isNaN(args[1])) return msg.channel.createMessage("<:fnope:809930139957460993> Please input a valid user ID!");

      let member = msg.channel.guild.members.get(args[1]);

      if (!member) return msg.addReaction("fnope:809930139957460993");

      if (member.id === msg.author.id) return msg.addReaction("fdenied:809930225273929748");

      if (member.id === bot.user.id) return msg.addReaction("fdenied:809930225273929748");

      let memberDB = await usersDB.findOne({ id: member.id });

      if (!memberDB)  return msg.channel.createMessage("<:fnope:809930139957460993> That user is not registered on the DB!");

      if (memberDB.blacklisted === false) {
        await msg.addReaction("fnope:809930139957460993");
        return msg.channel.createMessage("<:fnope:809930139957460993> ```ERR: USER_NOT_IN_DB```");
      }

      memberDB.blacklisted = false
      memberDB.blacklistReason = ""
      await memberDB.save().catch(err => console.log(err));
      return msg.addReaction("fyep:809930171569930270");
    }

    else {
      return msg.addReaction("fnope:809930139957460993");
    }
  }
}