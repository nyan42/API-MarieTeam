const mongoose = require("mongoose");

const CategorieSchema = mongoose.Schema({
    lettre: { type: String, required: true },
    libelle: { type: String, required: true }
}, { collection: "categorie" });

module.exports = mongoose.model("categorie", CategorieSchema);