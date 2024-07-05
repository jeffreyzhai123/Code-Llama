//make question router here: look at the answer.js
import express from 'express';
import { extract } from '../utils/extractor.js'
import { callOllama } from '../utils/ollama_helper.js'
import dbClient from "../config/db_connection.js"

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await dbClient.connect();
        console.log("Connected to MongoDB Atlas! Let's fetch data");
        let problembank = dbClient.db('problembank');
        let easyQuestions = problembank.collection('easy');
        let qs = await easyQuestions.find().toArray();
        console.log(qs);
    } catch (err) {
        console.log("Connect Error");
    }
});

export { router as questionRouter }

