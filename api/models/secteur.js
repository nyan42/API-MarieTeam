const mongoose = require("mongoose");

const SecteurSchema = mongoose.Schema({
    nom: { type: String, required: true }
}, { collection: "secteur" });

module.exports = mongoose.model("secteur", SecteurSchema);