const mongoose = require("mongoose");

module.exports = mongoose.model("UserGallery", new mongoose.Schema({

    id: String,
    registeredAt: String,
    usertag: String,
    userID: String,
    savesGallery: [String],
    nsfwGallery: [String],
    usedSlots: Number,
    totalSlots: Number,
    userGalleryPrivate: Boolean,
    nsfwGalleryPrivate: Boolean
}));