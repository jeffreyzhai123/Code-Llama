import express from "express"

import dbClient from "../config/db_connection.js"

const router = express.Router();

router.get('/', async (req, res) => {
    await dbClient.connect();
    let results_db = dbClient.db('performancereview');
    let res_collection = await results_db.collection("results");

    let result = await res_collection.find().toArray();

    if (result.length === 0) {
        //make the result status to 404 and return message to indicate that the user id does not exist in current database
        res.status(404).send({errormsg:"Not found"});
    } else {
        //send the user's information corresponding to the user id
        res.status(200).send(result);
    }
   
});

router.get("/:userid", async (req, res) => {
    await dbClient.connect();
    let results_db = dbClient.db('performancereview');
    let res_collection = await results_db.collection("results");

    //making a query object with the userid in the request url param
    let query = {userid: req.params.userid};
    let result = await res_collection.findOne(query)

    if (!result) {
        //make the result status to 404 and return message to indicate that the user id does not exist in current database
        res.status(404).send({errormsg:"Not found"});
    } else {
        //send the user's information corresponding to the user id
        res.status(200).send(result);
    }
   
});

router.post("/", async (req, res) => {
    await dbClient.connect();
    let results_db = dbClient.db('performancereview');
    try {
        let newUser = {
            userid: req.body.userid,
            username: req.body.username,
            results: [req.body.quizResult]
        };
        console.log('New User:', newUser);
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

router.delete("/:userid", async (req, res) => {
    //connect to database and get the collection out
    console.log("backend recieved");
    console.log(req);
    await dbClient.connect();
    let results_db = dbClient.db('performancereview');
    let res_collection = await results_db.collection("results");
    console.log(req.params.userid);
    //making a query object with the userid in the request to delete the corresponding user
    let query = {userid: req.params.userid};
    let result = await res_collection.deleteOne(query);

    if (!result) {
        //make the result status to 404 and return message to indicate that the user id does not exist in current database
        res.status(404).send({errormsg:"Not found"});
    } else {
        //send the user's information corresponding to the user id
        res.status(200).send(result);
    }
});

export { router as resultRouter };