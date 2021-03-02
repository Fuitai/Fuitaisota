const { promisify } = require("util");
const cpuStat = require("cpu-stat");
const p = promisify(cpuStat.usagePercent);
const { MessageEmbed } = require('helperis');

module.exports = {
    name: "status",
    category: "Info",
    aliases: ["stats", "botstats"],
    description: "Check my status in Discord.",
    run: async (bot, msg, args) => {
      
      let percent = await p();

const moment = require("moment");
require('moment-duration-format');

const actividad = moment.duration(bot.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");
    
let count = 0;
for (const guilds of bot.guilds.values()) {
    count += guilds.channels.size;
}
    
const embed = new MessageEmbed()
.setColor("#ff0080")

.setAuthor(`Bot Stats`, bot.user.avatarURL)
.addField(`Developers`, `Jimmy.deb#0001\n`+
`freddy#0380`, true)
.addField(`Version`, `0.4.4`, true)
.addField(`Library`, `Eris 0.14.0`, true)

.addField(`Memory (RAM Usage)`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
.addField(`Uptime`, `${actividad}`, true)
.addField(`Servers`, `${bot.guilds.size}`, true)



.addField(`Users`, `${bot.users.size}`, true)
.addField(`Text Channels`, `${count}`, true)
.addField(`Voice Connections`, `${bot.voiceConnections.size}`, true)

.addField(`Links`, `
          [Support me!](https://www.paypal.com/paypalme/808Jimmy)
          [Invite me!](https://discord.com/api/oauth2/authorize?client_id=767178904355078215&permissions=1342499958&scope=bot)`, true)


.addField(`CPU`, "`Intel(R) Xeon(R) CPU E5-2670 0 v8 @ 2.60GHz`", true)
.addField("CPU Usage", `\`${percent.toFixed(2)}%\``, true)

.setTimestamp()

msg.channel.createMessage({ embed: embed.code });
      
    }
}
