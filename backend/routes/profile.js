import express from 'express';
import dbClient from "../config/db_connection.js"

const router = express.Router();

//fetches all user data
router.get('/', async (req, res) => {
    try {
        await dbClient.connect();
        console.log("Connected to MongoDB Atlas! Let's fetch data");
        let users_db = dbClient.db('performancereview');
        let users_collection = users_db.collection('results');
        let users_data = await users_collection.find().toArray();
        res.status(200).send(users_data);
    } catch (error) {
        res.status(500).send("Connection Error!");
    }
});

//fetches the data of the specific user
router.get('/:userid', async (req, res) => {
    try {
        await dbClient.connect();
        console.log("Connected to MongoDB Atlas! Let's fetch data");
        let users_db = dbClient.db('performancereview');
        let users_collection = users_db.collection('results');
        let query = {userid: req.params.userid};
        let result = await users_collection.findOne(query);

        if (!result) {
            res.status(404).send({errormsg:"Not found"});
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send("Connection Error!");
    }
});

//updates username of the user object with the given user id
router.patch('/:userid', async (req, res) => {
    try {
        await dbClient.connect();
        console.log("Connected to MongoDB Atlas! Let's fetch data");
        let users_db = dbClient.db('performancereview');
        let users_collection = users_db.collection('results');

        const query = { userid: req.params.userid };
        const updates = {
            $set: {username: req.body.username}
        };
        let result = await users_collection.updateOne(query, updates);
        if (result.matchedCount === 0) {
            res.status(404).send("User not found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send("Update Error!");
    }
});

export { router as profileRouter }