const mongoose = require("mongoose");

const PortSchema = mongoose.Schema({
    nom: { type: String, required: true }
}, { collection: "port" });

module.exports = mongoose.model("port", PortSchema);