const mongoose = require("mongoose");

module.exports = (app) => {
    const Enregistrer = require("../models/enregistrer");

    app.get("/enregistrer", (req, res) => {
        Object.keys(req.query).map(element => {
            if (element.includes("_id")) req.query[element] = mongoose.Types.ObjectId(req.query[element]);
        });

        Enregistrer.aggregate(
            [
                { $lookup: { from: "type", localField: "type", foreignField: "_id", as: "type" } },
                { $lookup: { from: "categorie", localField: "type.categorie", foreignField: "_id", as: "categorie" } },
                { $lookup: { from: "reservation", localField: "reservation", foreignField: "_id", as: "reservation" } },
                { $lookup: { from: "traversee", localField: "reservation.traversee", foreignField: "_id", as: "traversee" } },
                { $lookup: { from: "bateau", localField: "traversee.bateau", foreignField: "_id", as: "bateau" } },
                { $lookup: { from: "liaison", localField: "traversee.liaison", foreignField: "_id", as: "liaison" } },
                { $lookup: { from: "secteur", localField: "liaison.secteur", foreignField: "_id", as: "secteur" } },
                { $lookup: { from: "port", localField: "liaison.port_depart", foreignField: "_id", as: "port_depart" } },
                { $lookup: { from: "port", localField: "liaison.port_arrivee", foreignField: "_id", as: "port_arrivee" } },
                {
                    $project: {
                        _id: "$_id",
                        reservation: {
                            _id: "$reservation._id",
                            nom: "$reservation.nom",
                            adr: "$reservation.adr",
                            cp: "$reservation.cp",
                            ville: "$reservation.ville",
                            traversee: {
                                _id: "$traversee._id",
                                bateau: "$bateau",
                                liaison: {
                                    _id: "$liaison._id",
                                    secteur: "$secteur",
                                    port_depart: "$port_depart",
                                    port_arrivee: "$port_arrivee",
                                    distance: "$liaison.distance"
                                },
                                date: "$traversee.date"
                            }
                        },
                        type: {
                            _id: "$type._id",
                            categorie: "$categorie",
                            num: "$type.num",
                            libelle: "$type.libelle"
                        },
                        quantite: "$quantite"
                    }
                },
                { $unwind: "$type" },
                { $unwind: "$type._id" },
                { $unwind: "$type.num" },
                { $unwind: "$type.libelle" },
                { $unwind: "$type.categorie" },
                { $unwind: "$reservation" },
                { $unwind: "$reservation._id" },
                { $unwind: "$reservation.nom" },
                { $unwind: "$reservation.adr" },
                { $unwind: "$reservation.cp" },
                { $unwind: "$reservation.ville" },
                { $unwind: "$reservation.traversee" },
                { $unwind: "$reservation.traversee._id" },
                { $unwind: "$reservation.traversee.bateau" },
                { $unwind: "$reservation.traversee.date" },
                { $unwind: "$reservation.traversee.liaison" },
                { $unwind: "$reservation.traversee.liaison._id" },
                { $unwind: "$reservation.traversee.liaison.secteur" },
                { $unwind: "$reservation.traversee.liaison.port_depart" },
                { $unwind: "$reservation.traversee.liaison.port_arrivee" },
                { $unwind: "$reservation.traversee.liaison.distance" },
                { $match: req.query },
            ],
            (error, result) => {
                if (error) res.status(400).json(error);
                res.status(200).json(result);
            }
        );
    });
}