const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({

    id: String,
    registeredAt: String,
    usertag: String,
    userID: String,
    dev: Boolean,
    creator: Boolean,
    blacklisted: Boolean,
    blacklistReason: String,
    donationTier: String,
    donator: Boolean,
    donatorSince: String,
    achievements: [Object],
    achievementsNormal: [String]
}));