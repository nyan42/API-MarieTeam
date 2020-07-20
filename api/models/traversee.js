require("../models/bateau");
require("../models/liaison");

const mongoose = require("mongoose");

const TraverseeSchema = mongoose.Schema({
    date: { type: Date, required: true },
    bateau: { type: mongoose.Types.ObjectId, ref: 'bateau', required: true },
    liaison: { type: mongoose.Types.ObjectId, ref: 'liaison', required: true },
    mer: { type: mongoose.Types.ObjectId, ref: 'mer' },
    commentaire: { type: String },
    retard: { type: Number },
}, { collection: "traversee" });

module.exports = mongoose.model("traversee", TraverseeSchema);