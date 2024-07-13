//make question router here: look at the answer.js
import express from 'express';
import dbClient from "../config/db_connection.js"

const router = express.Router();
let diffLevels = ['easy','medium','hard'];

router.get('/', async (req, res) => {
    try {
        await dbClient.connect();
        console.log("Connected to MongoDB Atlas! Let's fetch data");
        let problembank = dbClient.db('problembank');
        let allQuestions = [];
        for (let level of diffLevels) {
            let quesObj = problembank.collection(level);
            let q = await quesObj.find().toArray();
            allQuestions = allQuestions.concat(q);
        }
        res.status(200).send(allQuestions);
    } catch (err) {
        res.status(500).send("Connection Error!");
    }
});

router.get('/easy', async (req, res) => {
    try {
        await dbClient.connect();
        let problembank = dbClient.db('problembank');
        let easyQuestions = problembank.collection('easy');
        let questions = await easyQuestions.find().toArray();
        res.status(200).send(questions);
    } catch (err) {
        res.status(500).send("Connecting Error!");
    }
});

router.get('/medium', async (req, res) => {
    try {
        await dbClient.connect();
        let problembank = dbClient.db('problembank');
        let easyQuestions = problembank.collection('medium');
        let questions = await easyQuestions.find().toArray();
        res.status(200).send(questions);
    } catch (err) {
        res.status(500).send("Connecting Error!");
    }
});

router.get('/hard', async (req, res) => {
    try {
        await dbClient.connect();
        let problembank = dbClient.db('problembank');
        let easyQuestions = problembank.collection('hard');
        let questions = await easyQuestions.find().toArray();
        res.status(200).send(questions);
    } catch (err) {
        res.status(500).send("Connecting Error!");
    }
});

export { router as questionRouter }

