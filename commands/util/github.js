const { MessageEmbed } = require("helperis");
const moment = require("moment");
const fetch = require("node-fetch");
module.exports = {
    name: "github",
    aliases: ["gb", "githubuser", "githubusername"],
    category: "Information",
    description: "Returns Latency and API Latency.",
run: async (client, msg, args) => {
     try {

  if (!args[0]) return msg.channel.createMessage(`Please give me an username!`);
    
  fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return msg.channel.createMessage(`User Not Found!`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

    msg.channel.sendTyping()

            const embed = new MessageEmbed()
            .setAuthor(`${login}'s Information!`, avatar_url)
            .setColor('RANDOM')
            .setThumbnail(`${avatar_url}`)
            .addField(`Username`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Bio`, `${bio || "None"}`)
            .addField(`Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`Followers`, `${followers}`, true)
            .addField(`Following`, `${following}`, true)
            .addField(`Location`, `${location || "None"}`)
            .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
            .setTimestamp();

            msg.channel.createMessage({ embed: embed.code })

    })

        } catch (error) {
            console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
            return msg.channel.createMessage(`Something went wrong, try again later!`)
        }
}
}