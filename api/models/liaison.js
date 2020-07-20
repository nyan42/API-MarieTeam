require("../models/port");
require("../models/secteur");

const mongoose = require("mongoose");

const LiaisonSchema = mongoose.Schema({
    distance: { type: Number, required: true },
    port_depart: { type: mongoose.Types.ObjectId, ref: 'port', required: true },
    port_arrivee: { type: mongoose.Types.ObjectId, ref: 'port', required: true },
    secteur: { type: mongoose.Types.ObjectId, ref: 'secteur', required: true }
}, { collection: "liaison" });

module.exports = mongoose.model("liaison", LiaisonSchema);