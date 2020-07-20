const mongoose = require("mongoose");

module.exports = (app) => {
    const Liaison = require("../models/liaison");

    app.get("/liaison", (req, res) => {
        Object.keys(req.query).map(element => {
            if (element.includes("_id")) req.query[element] = mongoose.Types.ObjectId(req.query[element]);
        });

        Liaison.aggregate(
            [
                { $lookup: { from: "secteur", localField: "secteur", foreignField: "_id", as: "secteur" } },
                { $lookup: { from: "port", localField: "port_depart", foreignField: "_id", as: "port_depart" } },
                { $lookup: { from: "port", localField: "port_arrivee", foreignField: "_id", as: "port_arrivee" } },
                {
                    $project: {
                        _id: "$_id",
                        secteur: "$secteur",
                        port_depart: "$port_depart",
                        port_arrivee: "$port_arrivee",
                        distance: "$distance"
                    }
                },
                { $unwind: "$secteur" },
                { $unwind: "$port_depart" },
                { $unwind: "$port_arrivee" },
                { $match: req.query },
            ],
            (error, result) => {
                if (error) res.status(400).json(error);
                res.status(200).json(result);
            }
        );
    });
}