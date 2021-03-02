const { MessageEmbed } = require('helperis');
const fortunes = require('../../assets/json/fortune.json');

module.exports = {
  name: 'fortune',
  aliases: [ 'ft', 'fortunecookies', 'fortunecookie' ],
  group: 'fun',
  description: 'Generate a random fortune',
  run: async (bot, msg, args) => {

    msg.channel.sendTyping()
    const embed = new MessageEmbed()
    .setColor('GREY')
    .setTitle(`${msg.author.username}'s fortune`)
    .setFooter(`Fortune | \©️ ${new Date().getFullYear()} | Fuitaisota`)
    .setDescription(fortunes[Math.floor(Math.random() * fortunes.length)])

    msg.channel.createMessage({ embed: embed.code });

  }

}
  