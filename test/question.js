//make question router here: look at the answer.js
// import express from 'express';
// import dbClient from "../config/db_connection.js"

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

router.get('/easy/:id', async (req, res) => {
    try {
        await dbClient.connect();
        let quesID = req.params.id;
        let problembank = dbClient.db('problembank');
        let easyQuestions = problembank.collection('easy');
        let q = await easyQuestions.findOne({qNum: quesID});
        res.status(200).send(q);
    } catch (err) {
        res.status(500).send("Connecting Error!");
    }
})

export { router as questionRouter }

