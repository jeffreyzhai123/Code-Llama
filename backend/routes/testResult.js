//this API handler is creating merely for testing purpose in a browser
import express from 'express';
import { testSelector } from '../utils/sandbox.js';


const router = express.Router();

router.post('/', async (req, res) => {

    // Check if request body is correctly received
    try {
        console.log(req.body); 
        const num = req.body.num;
        const code = req.body.code;
        const diff = req.body.diff;
        console.log(num);
        console.log(code);
        console.log("diff: ", diff);
    
        const test_result = await testSelector(num, code, diff);
    
        res.json({testResult:test_result});
        
    } catch (error) {

        console.log(error.message);
        res.json({errmsg:error.message});
        
    }
   
});

export { router as testResultRouter };