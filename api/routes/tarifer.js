const mongoose = require("mongoose");

module.exports = (app) => {
    const Tarifer = require("../models/tarifer");

    app.get("/tarifer", (req, res) => {
        Object.keys(req.query).map(element => {
            if (element.includes("_id")) req.query[element] = mongoose.Types.ObjectId(req.query[element]);
        });

        Tarifer.aggregate([
            { $lookup: { from: "type", localField: "type", foreignField: "_id", as: "type" } },
            { $lookup: { from: "categorie", localField: "type.categorie", foreignField: "_id", as: "categorie" } },
            { $lookup: { from: "liaison", localField: "liaison", foreignField: "_id", as: "liaison" } },
            { $lookup: { from: "secteur", localField: "liaison.secteur", foreignField: "_id", as: "secteur" } },
            { $lookup: { from: "port", localField: "liaison.port_depart", foreignField: "_id", as: "port_depart" } },
            { $lookup: { from: "port", localField: "liaison.port_arrivee", foreignField: "_id", as: "port_arrivee" } },
            { $lookup: { from: "periode", localField: "periode", foreignField: "_id", as: "periode" } },
            {
                $project: {
                    _id: 1,
                    type: {
                        _id: "$type._id",
                        categorie: "$categorie",
                        num: "$type.num",
                        libelle: "$type.libelle"
                    },
                    liaison: {
                        _id: "$liaison._id",
                        secteur: "$secteur",
                        port_depart: "$port_depart",
                        port_arrivee: "$port_arrivee",
                        distance: "$liaison.distance"
                    },
                    periode: "$periode",
                    tarif: "$tarif"
                }
            },
            { $unwind: "$type" },
            { $unwind: "$liaison" },
            { $unwind: "$type._id" },
            { $unwind: "$type.num" },
            { $unwind: "$type.libelle" },
            { $unwind: "$type.categorie" },
            { $unwind: "$liaison._id" },
            { $unwind: "$liaison.distance" },
            { $unwind: "$liaison.secteur" },
            { $unwind: "$liaison.port_depart" },
            { $unwind: "$liaison.port_arrivee" },
            { $unwind: "$periode" },
            { $match: req.query }
        ],
            (error, result) => {
                if (error) res.status(400).json(error);
                res.status(200).json(result);
            });
    });
}