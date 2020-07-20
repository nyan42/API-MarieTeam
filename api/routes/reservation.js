const mongoose = require("mongoose");

module.exports = (app) => {
    const Reservation = require("../models/reservation");

    app.get("/reservation", (req, res) => {
        Object.keys(req.query).map(element => {
            if (element.includes("_id")) req.query[element] = mongoose.Types.ObjectId(req.query[element]);
            if (element.includes("date")) req.query[element] = new Date(req.query[element]);
        });

        Reservation.aggregate(
            [
                { $lookup: { from: "traversee", localField: "traversee", foreignField: "_id", as: "traversee" } },
                { $lookup: { from: "bateau", localField: "traversee.bateau", foreignField: "_id", as: "bateau" } },
                { $lookup: { from: "liaison", localField: "traversee.liaison", foreignField: "_id", as: "liaison" } },
                { $lookup: { from: "secteur", localField: "liaison.secteur", foreignField: "_id", as: "secteur" } },
                { $lookup: { from: "port", localField: "liaison.port_depart", foreignField: "_id", as: "port_depart" } },
                { $lookup: { from: "port", localField: "liaison.port_arrivee", foreignField: "_id", as: "port_arrivee" } },
                {
                    $project: {
                        _id: "$_id",
                        nom: "$nom",
                        adr: "$adr",
                        cp: "$cp",
                        ville: "$ville",
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
                    }
                },
                { $unwind: "$traversee" },
                { $unwind: "$traversee._id" },
                { $unwind: "$traversee.bateau" },
                { $unwind: "$traversee.date" },
                { $unwind: "$traversee.liaison" },
                { $unwind: "$traversee.liaison._id" },
                { $unwind: "$traversee.liaison.secteur" },
                { $unwind: "$traversee.liaison.port_depart" },
                { $unwind: "$traversee.liaison.port_arrivee" },
                { $unwind: "$traversee.liaison.distance" },
                { $match: req.query },
            ],
            (error, result) => {
                if (error) res.status(400).json(error);
                res.status(200).json(result);
            }
        );
    });
}