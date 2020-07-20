require("../models/traversee");

const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema({
    nom: { type: String, required: true },
    adr: { type: String, required: true },
    cp: { type: Number, required: true },
    ville: { type: String, required: true },
    traversee: { type: mongoose.Types.ObjectId, ref: 'traversee', required: true }
}, { collection: "reservation" });

module.exports = mongoose.model("reservation", ReservationSchema);