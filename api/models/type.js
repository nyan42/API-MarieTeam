require("../models/categorie");

const mongoose = require("mongoose");

const TypeSchema = mongoose.Schema({
    categorie: { type: mongoose.Types.ObjectId, ref: 'categorie', required: true },
    num: { type: Number, required: true },
    libelle: { type: String, required: true}
}, { collection: "type" });

module.exports = mongoose.model("type", TypeSchema);