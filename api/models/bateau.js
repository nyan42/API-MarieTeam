const mongoose = require("mongoose");

const BateauSchema = mongoose.Schema({
    nom: { type: String, required: true }
}, { collection: "bateau" });

module.exports = mongoose.model("bateau", BateauSchema);