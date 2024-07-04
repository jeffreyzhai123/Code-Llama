import express from 'express'
const router = express.Router();
import QuestionModel from "../models/QuestionModel.js"
import db from "../config/db_connection.js"

router.get('/questions', async (req, res) => {
    let quesCollection = await db.collection("problembank");
    let questionItems = quesCollection.find().toArray({});
    console.log(questionItems);
    console.log("Test some change");
});

router.get('/questions/:id', async (req, res) => {
    let quesID = req.params.id;
    let question = await db.collection("problembank");
});

export default router;