import express from 'express';
import cors from 'cors';
// import dbClient from './config/db_connection.js';
import { answerRouter } from './routes/answer.js'
import { questionRouter } from './routes/question.js'

const app = express(); //create express app
const port = 3080; //set port number

app.use(cors()); //allows for cross origin resource sharing
app.use(express.json()); //middleware used to parse incoming JSON requests

app.use('/answer', answerRouter);
app.use('/question', questionRouter);
/* await dbClient.connect();
console.log("Connected to MongoDB Atlas! Let's fetch data");
let problembank = dbClient.db('problembank');
let easyQuestions = problembank.collection('easy');
let qs = await easyQuestions.find().toArray();

console.log(qs); */

/* app.get('/', (req, res) => {
    res.send("Hello World");
}) */

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
