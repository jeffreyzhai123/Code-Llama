import express from 'express';
import cors from 'cors';
// import dbClient from './config/db_connection.js';
import { answerRouter } from './routes/answer.js'
import { questionRouter } from './routes/question.js'
import { resultRouter } from './routes/results.js';
import { testResultRouter } from './routes/testResult.js';
import { profileRouter } from './routes/profile.js';

const app = express(); //create express app
const port = 3080; //set port number

app.use(cors()); //allows for cross origin resource sharing
app.use(express.json()); //middleware used to parse incoming JSON requests

app.use('/answer', answerRouter);
app.use('/question', questionRouter);
app.use('/results', resultRouter);
app.use('/testResult', testResultRouter);
app.use('/profile', profileRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

