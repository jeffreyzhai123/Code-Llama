import express from 'express';
import cors from 'cors';
import db from './config/db_connection.js';
import { answerRouter } from './routes/answer.js'
import questionRoute from './routes/index.js';

const app = express(); //create express app
const port = 3080; //set port number

app.use(cors); //allows for cross origin resource sharing
app.use(express.json()); //middleware used to parse incoming JSON requests

app.use('/answer', answerRouter);
app.use('/question', questionRouter);
//add app.use() for the other router here

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
