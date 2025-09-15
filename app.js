const express = require('express');
const fsPromises = require('fs/promises');

const app = express();
const port = 3000;

const apiRouter = express.Router();

app.use(express.json());

apiRouter.put("/store/:key", async (req, res) => {
    const { key } = req.params;
    const json = JSON.stringify(req.body);

    try {
        await fsPromises.writeFile(`/data/${key}.json`, json);
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end();
        return;
    }

    res.status(204);
    res.end();
});

apiRouter.get("/store/:key", async (req, res) => {
    const { key } = req.params;
    let json = "";

    try {
        json = await fsPromises.readFile(`/data/${key}.json`);
    } catch (err) {
        if (err.code === "ENOENT") {
            res.statusCode = 404;
        } else {
            console.log(err);
            res.statusCode = 500;
        }
    }

    if (json) {
        res.send(json);
    } else {
        res.status(404);
        res.end();
        return;
    }
});

app.use("/api", apiRouter);

app.use("/assets", express.static("/www/assets"))

app.get("/", (req, res) => {
    res.sendFile("/www/index.html");
});

// catch-all routing for single-page apps
app.get("*path", (req, res) => {
    res.sendFile("/www/index.html");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
