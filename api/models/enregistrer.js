require("../models/type");
require("../models/reservation");

const mongoose = require("mongoose");

const EnregistrerSchema = mongoose.Schema({
    type: { type: mongoose.Types.ObjectId, ref: 'type', required: true },
    reservation: { type: mongoose.Types.ObjectId, ref: 'reservation', required: true },
    quantite: { type: Number, required: true }
}, { collection: "enregistrer" });

module.exports = mongoose.model("enregistrer", EnregistrerSchema);