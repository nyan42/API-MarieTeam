require("../models/categorie");
require("../models/bateau");

const mongoose = require("mongoose");

const ContenirSchema = mongoose.Schema({
    categorie: { type: mongoose.Types.ObjectId, ref: 'categorie', required: true },
    bateau: { type: mongoose.Types.ObjectId, ref: 'bateau', required: true },
    capaciteMax: { type: Number, required: true}
}, { collection: "contenir" });

module.exports = mongoose.model("contenir", ContenirSchema);