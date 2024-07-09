import express from "express"

import dbClient from "../config/db_connection.js"

const router = express.Router();

router.get("/:userid", async (req, res) => {
    await dbClient.connect();
    let results_db = dbClient.db('performancereview');
    let res_collection = await results_db.collection("results");

    //making a query object with the userid in the request url param
    let query = {userid: req.params.userid};
    let result = await res_collection.findOne(query)

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.post("/", async (req, res) => {
    await dbClient.connect();
    let results_db = dbClient.db('performancereview');
    try {
        let newUser = {
            userid: req.body.userid,
            results: [req.body.quizResult]
        };
        let res_collection = await results_db.collection("results");
        let result = await res_collection.insertOne(newUser);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.patch("/:userid", async (req, res) => {
    await dbClient.connect();
    let results_db = dbClient.db('performancereview');
    try {
        const query = { userid: req.params.userid };
        const updates = {
            $push: {
                results: req.body.quizResult
            },
        };
        let res_collection = await results_db.collection("results");
        let result = await res_collection.updateOne(query, updates);
        if (result.matchedCount === 0) {
            res.status(404).send("User not found");
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
    }
});

export { router as resultRouter };