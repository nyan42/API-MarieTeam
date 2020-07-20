const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    Login: { type: String, required: true },
    Mdp: {type:String, required: true}
}, { collection: "admin" });

module.exports = mongoose.model("admin", AdminSchema);