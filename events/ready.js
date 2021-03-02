module.exports = async (bot) => {
    try {
        let statuses = ["Eris", "<help", "<help <command> for specific info of a command!", "osu!"];

        console.log(`${bot.user.username}#${bot.user.discriminator} is now online on ${bot.guilds.size} Guilds with ${bot.users.size} Users!`); // Log "Ready!"
        setInterval(() => {
            let result = Math.floor((Math.random() * statuses.length));

            if (statuses[result] === "osu!") {
                let status2 = Math.floor((Math.random() * 2) + 1);

                if (status2 === 1) {
                    return bot.editStatus("online", { name: statuses[result], type: status2, url: "https://www.twitch.tv/izac999" });
                } else {
                    return bot.editStatus("online", { name: statuses[result], type: 0 });
                }
            } else {
                let status = Math.floor((Math.random() * 3) + 1);

                if (status === 1) {
                    return bot.editStatus("online", { name: statuses[result], type: status, url: "https://www.twitch.tv/jimmysito_" });
                } else {
                    return bot.editStatus("online", { name: statuses[result], type: status });
                }
            }
        }, 240000);

    } catch (e) {
        console.log(e);
    }

};