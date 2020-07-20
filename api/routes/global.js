module.exports = (app) => {
    const Admin = require("../models/admin");
    const Ca = require("../models/ca");
    const Bateau = require("../models/bateau");
    const Categorie = require("../models/categorie");
    const Periode = require("../models/periode");
    const Port = require("../models/port");
    const Secteur = require("../models/secteur");
    const Contenir = require("../models/contenir");
    const Enregistrer = require("../models/enregistrer");
    const Liaison = require("../models/liaison");
    const Reservation = require("../models/reservation");
    const Tarifer = require("../models/tarifer");
    const Traversee = require("../models/traversee");
    const Mer = require("../models/mer");
    const Type = require("../models/type");

    // used to diplay his own collection
    require("./entity")(app, Admin, "admin")
    require("./entity")(app, Ca, "ca");
    require("./entity")(app, Bateau, "bateau");
    require("./entity")(app, Categorie, "categorie");
    require("./entity")(app, Periode, "periode");
    require("./entity")(app, Port, "port");
    require("./entity")(app, Secteur, "secteur");
    require("./entity")(app, Mer, "mer");
    // used to diplay other collection
    require("./general")(app, Contenir, "contenir");
    require("./general")(app, Enregistrer, "enregistrer");
    require("./general")(app, Liaison, "liaison");
    require("./general")(app, Reservation, "reservation");
    require("./general")(app, Tarifer, "tarifer");
    require("./general")(app, Traversee, "traversee");
    require("./general")(app, Type, "type");
    require("./contenir")(app);
    require("./enregistrer")(app);
    require("./liaison")(app);
    require("./reservation")(app);
    require("./tarifer")(app);
    require("./traversee")(app);
    require("./type")(app);
     
     app.all("*", (req, res) => {
        res
           .status(404)
           .json({
              error: 404,
              message: "URL not found."
           });
     });
}