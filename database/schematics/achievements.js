const mongoose = require("mongoose");

module.exports = mongoose.model("achievements", new mongoose.Schema({

    id: String,
    achievements: [String],
    raritiesemoji: [String],
    raritiestext: [String]
}));