const express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const CONNECTION_DB = "mongodb://localhost:27017/api",
    PORT = 3000;

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

require("./api/routes/global")(app);

app.use((req, res) => {
    if (req === "undefined") {
        res
            .status(400)
            .json({
                error: 400,
                message: "URL contains invalid parameters."
            });
    }
});

mongoose.connect(
    CONNECTION_DB,
    { useUnifiedTopology: true, useNewUrlParser: true, serverSelectionTimeoutMS: 3000 }
)
    .then(() => {
        console.log(`[\x1b[32mOK\x1b[0m] API has successfully started on port ${PORT}.`);
    });

mongoose.connection.on('error', err => {
    console.log("[\x1b[31mERROR\x1b[0m] Database is unreachable.");
    console.log("[\x1b[33mWARNING\x1b[0m] Closing the server...");
    mongoose.disconnect();
    process.exit(0);
});

mongoose.connection.on('disconnected', err => {
    console.log("[\x1b[31mERROR\x1b[0m] Server has lost his connection with the database.");
    console.log("[\x1b[33mWARNING\x1b[0m] Closing the server...");
    process.exit(0);
});

app.listen(PORT);