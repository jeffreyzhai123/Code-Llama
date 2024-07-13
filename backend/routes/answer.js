import express from 'express';
import { extract } from '../utils/extractor.js'
import { callOllama } from '../utils/ollama_helper.js'
import { testSelector } from '../utils/sandbox.js'

const router = express.Router();

router.post('/', async (req, res) => {

    // Check if request body is correctly received
    console.log(req.body); 
    const answer = req.body.ans;
    const num = req.body.no;
    const diff = req.body.diff;
    console.log(answer);
    console.log(num);
    console.log("backend answer.js diff: ", diff);

    if(answer === ""){
        res.json({ 
            message: "Success but empty answer",  
            correctness : false, 
            failedTests : "All tests failed since you did not provide an answer", 
            generatedCode : "No generated code since you did not provide an answer"
        });

    } else {
        try {
            let correct = false;
             //send user's answer to Ollama and extract the code part
            const ollamaResponse = await callOllama(answer);
            const generatedCode = extract(ollamaResponse);
            const selectedNum = parseInt(num);
            console.log("testID: ", selectedNum);
            const test_res = await testSelector(selectedNum, generatedCode, diff);
            console.log(ollamaResponse);
            console.log(generatedCode);
            console.log(test_res);

            if(test_res.includes("passed")) {
                correct = true;
            } else {
                correct = false;
            }

            //generated code should be run again tests somehow, but for experiementing purpose
            //this return true/false all the time
            
            // Send back result 
            res.json({
                message: "Success", 
                correctness : correct,
                failedTests : test_res,
                generatedCode : generatedCode
            });
            
        } catch (error) {
            console.log(error.message);
        }
    }
    
    
});

export { router as answerRouter};