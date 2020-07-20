const mongoose = require("mongoose");

module.exports = (app) => {
    const Traversee = require("../models/traversee");

    app.get("/traversee", (req, res) => {
        Object.keys(req.query).map(element => {
            if (element.includes("_id")) req.query[element] = mongoose.Types.ObjectId(req.query[element]);
            if (element.includes("date")) req.query[element] = new Date(req.query[element]);
        });

        Traversee.aggregate(
            [
                { $lookup: { from: "bateau", localField: "bateau", foreignField: "_id", as: "bateau" } },
                { $lookup: { from: "liaison", localField: "liaison", foreignField: "_id", as: "liaison" } },
                { $lookup: { from: "secteur", localField: "liaison.secteur", foreignField: "_id", as: "secteur" } },
                { $lookup: { from: "port", localField: "liaison.port_depart", foreignField: "_id", as: "port_depart" } },
                { $lookup: { from: "port", localField: "liaison.port_arrivee", foreignField: "_id", as: "port_arrivee" } },
                {
                    $project: {
                        bateau: "$bateau",
                        liaison: {
                            _id: "$liaison._id",
                            secteur: "$secteur",
                            port_depart: "$port_depart",
                            port_arrivee: "$port_arrivee",
                            distance: "$liaison.distance"
                        },
                        date: "$date",
                    }
                },
                { $unwind: "$bateau" },
                { $unwind: "$liaison" },
                { $unwind: "$liaison._id" },
                { $unwind: "$liaison.secteur" },
                { $unwind: "$liaison.port_depart" },
                { $unwind: "$liaison.port_arrivee" },
                { $unwind: "$liaison.distance" },
                { $match: req.query },
            ],
            (error, result) => {
                if (error) res.status(400).json(error);
                res.status(200).json(result);
            }
        );
    });
}