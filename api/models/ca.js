const mongoose = require("mongoose");

const CaSchema = mongoose.Schema({
    ca: { type: Number, required: true }
}, { collection: "ca" });

module.exports = mongoose.model("ca", CaSchema);