const express = require('express');
const fsPromises = require('fs/promises');

const app = express();
const port = 3000;

app.use(express.json());

app.put("/:key", async (req, res) => {
    const { key } = req.params;
    console.log(`received PUT request for key ${key}`);
    const json = JSON.stringify(req.body);
    console.log(json);

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

app.get("/:key", async (req, res) => {
    const { key } = req.params;
    console.log(`received GET request for key ${key}`);
    let json = "";

    try {
        json = await fsPromises.readFile(`/data/${key}.json`);
        console.log(json);
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

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
