const mongoose = require("mongoose");

module.exports = (app) => {
    const Type = require("../models/type");

    app.get("/type", (req, res) => {
        Object.keys(req.query).map(element => {
            if (element.includes("_id")) req.query[element] = mongoose.Types.ObjectId(req.query[element]);
        });

        Type.aggregate(
            [
                { $lookup: { from: "categorie", localField: "categorie", foreignField: "_id", as: "categorie" } },
                {
                    $project: {
                        _id: "$_id",
                        categorie: "$categorie",
                        num: "$num",
                        libelle: "$libelle"
                    }
                },
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