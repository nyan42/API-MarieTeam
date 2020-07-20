require("../models/type");
require("../models/liaison");
require("../models/periode");

const mongoose = require("mongoose");

const TariferSchema = mongoose.Schema({
    type: { type: mongoose.Types.ObjectId, ref: 'type', required: true },
    liaison: { type: mongoose.Types.ObjectId, ref: 'liaison', required: true },
    periode: { type: mongoose.Types.ObjectId, ref: 'periode', required: true },
    tarif: { type: Number, required: true }
}, { collection: "tarifer" });

module.exports = mongoose.model("tarifer", TariferSchema);