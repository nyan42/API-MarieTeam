module.exports = (app, Entity, path) => {
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
            .then(result => {
                if (result.deletedCount > 0)
                    res.status(200).json({ message: "Entity has successfully been deleted.", parameters: req.query });
                else
                    res.status(404).json({ error: "Entity hasn't been retrieved.", parameters: req.query });
            });
    });
}