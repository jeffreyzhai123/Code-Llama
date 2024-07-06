import express from 'express';
import { extract } from '../utils/extractor.js'
import { callOllama } from '../utils/ollama_helper.js'

const router = express.Router();

router.post('/', async (req, res) => {

    // Check if request body is correctly received
    console.log(req.body); 
    const answer = req.body.ans;
    console.log(answer);

    if(answer === ""){
        res.json({ 
            message: "Success but empty answer",  
            correctness : false, 
            failedTests : "All tests failed since you did not provide an answer", 
            generatedCode : "No generated code since you did not provide an answer"
        });

    } else {
        //send user's answer to Ollama and extract the code part
        const ollamaResponse = await callOllama(answer);
        const generatedCode = extract(ollamaResponse);
        console.log(ollamaResponse);
        console.log(generatedCode);

        //generated code should be run again tests somehow, but for experiementing purpose
        //this return true/false all the time
        
        // Send back result 
        res.json({
            message: "Success", 
            correctness : false,
            failedTests : "some failed tests will be shown here",
            generatedCode : generatedCode
        });
    }
    
    
});

export { router as answerRouter};