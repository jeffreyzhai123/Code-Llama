import express from 'express';
import { extract } from '../utils/extractor.js'
import { callOllama } from '../utils/ollama_helper.js'

const router = express.Router();

router.post('/', async (req, res) => {
    //do backend api magic stuff
    
    //send back result 
    res.json({})
});

export { router as answerRouter};