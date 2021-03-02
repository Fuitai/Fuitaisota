const guilds = require("./../database/schematics/prefix.js");

module.exports = async (bot, guild) => {
    try {
        console.log(`\n\n-----------------------------\n\nJoined a new Guild!\nGuild Name: ${guild.name}\nGuild ID: ${guild.id}\n\n-----------------------------\n\n`);

        let guildDB = await guilds.findOne({ id: guild.id });

        if (!guildDB) {
          guildDB = new guilds({
            Prefix: "",
            GuildID: guild.id
          })
          await guildDB.save().catch(err => console.log(err));
          console.log("que tremendo el culo de pollux loco")
        }
    } catch (e) {
        console.log(e);
    }
};
