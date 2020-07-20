module.exports = (app, Entity, path) => {
    app.get(`/${path}`, async (req, res) => {
        if (Object.keys(req.query).length === 0 && req.query.constructor === Object)
            res.status(200).json(await Entity.find().select("-__v"));
        else
            Entity.findOne(req.query)
                .select("-__v")
                .then(result => result !== null
                    ? res.status(200).json(result)
                    : res.status(404).json({ message: "Entity not found.", parameters: req.query }));
    });

    app.post(`/${path}`, async (req, res) => {
        const entity = new Entity(req.body);

        entity.save()
            .then(result => res.status(200).json(result))
            .catch(error => res.status(400).json(error));
    });

    app.put(`/${path}`, async (req, res) => {
        if (Object.keys(req.query).length === 0 && req.query.constructor === Object)
            return res.status(400).json({ error: "Parameters undefined." });
        Entity.updateMany(req.query, { $set: req.body })
            .then(result => result.nModified > 0
                ? res.status(200).json({ message: "Entity has successfully been updated.", parameters: req.query })
                : res.status(404).json({ error: "Entity hasn't been retrieved.", parameters: req.query }));
    });

    app.delete(`/${path}`, async (req, res) => {
        if (Object.keys(req.query).length === 0 && req.query.constructor === Object)
            return res.status(400).json({ error: "Parameters undefined." });
        Entity.deleteMany(req.query)
            .then(result => result.deletedCount > 0
                ? res.status(200).json({ message: "Entity has successfully been deleted.", parameters: req.query })
                : res.status(404).json({ error: "Entity hasn't been retrieved.", parameters: req.query }));
    });
}
