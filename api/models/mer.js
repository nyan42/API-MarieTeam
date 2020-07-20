const mongoose = require("mongoose");

const MerSchema = mongoose.Schema({
    etat: { type: String, required: true }
}, { collection: "mer" });

module.exports = mongoose.model("mer", MerSchema);