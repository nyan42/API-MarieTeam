const mongoose = require("mongoose");

module.exports = (app) => {
    const Contenir = require("../models/contenir");

    app.get("/contenir", (req, res) => {
        Object.keys(req.query).map(element => {
            if (element.includes("_id")) req.query[element] = mongoose.Types.ObjectId(req.query[element]);
        });

        Contenir.aggregate(
            [
                { $lookup: { from: "bateau", localField: "bateau", foreignField: "_id", as: "bateau" } },
                { $lookup: { from: "categorie", localField: "categorie", foreignField: "_id", as: "categorie" } },
                {
                    $project: {
                        _id: "$_id",
                        bateau: "$bateau",
                        categorie: "$categorie",
                        capaciteMax: "$capaciteMax"
                    }
                },
                { $unwind: "$bateau" },
                { $unwind: "$categorie" },
                { $match: req.query },
            ],
            (error, result) => {
                if (error) res.status(400).json(error);
                res.status(200).json(result);
            }
        );
    });
}