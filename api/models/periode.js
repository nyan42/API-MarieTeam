const mongoose = require("mongoose");

const PeriodeSchema = mongoose.Schema({
    dateDeb: { type: Date, required: true },
    dateFin: { type: Date, required: true }
}, { collection: "periode" });

module.exports = mongoose.model("periode", PeriodeSchema);