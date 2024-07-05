import express from 'express';
import { extract } from '../utils/extractor.js'
import { callOllama } from '../utils/ollama_helper.js'



const router = express.Router();

router.post('/', async (req, res) => {
    console.log("Message received");
    console.log(req.body); // Check if request body is correctly received

    // Send back result 
    res.json({ message: "Success" });
});

export { router as answerRouter};