//dispaly code questions

import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CodeQuestion = () =>{

    //communicate with the backend to get all questions as a json array
    const problem_bank = null;

    //get first question and question number; initialize attempt number to 1st attempt
    const [question_num, setQuestionNumber] = useState(1);
    const [question, setQuestion] = useState(generateNext(problem_bank, null));
    const [attempt_num, setAttemptNum] = useState(1);
    //user answer
    const [answer, setAns] = useState("");
    //element for second attempt
    const [generatedCode, setGC] = useState("");
    const [failedTestCase, setTestCase] = useState("");
    const [reasonOfChange, setReason] = useState("");

    //go to other page
    let navigate = useNavigate();
    

    //function that handle submit=> ask banckend right or wrong and decide what to do next

    //correct + first attempt: update the question variable + update question number + attemp_num stay at 1
    //incorrect + first attempt: update attemp_num to 2 + display additional component related to the second attempt

    //correct/incorrect + second attempt: update the question variable + reset attemp_num to 1 + update question number

    
    //incorrect + first attempt (last question): update attemp_num to 2 + display additional component related to the second attempt

    //correct + first attempt (last question) & correct/incorrect + second attempt (last question): redirect to the quiz result page
    function handleAnsSubmit(event) {
        event.preventDefault();
        //assure the answer is fetched correctly; will be deleted
        // alert("your input is " + answer);

        //will be replace by a API call to backend to check correctness
        const correctness = false;
        

        if(question_num < 8) {
            if(attempt_num === 2 || correctness){
                setGC("");
                setTestCase("");
                setQuestion("this is the next question");
                setAttemptNum(1);
                setQuestionNumber(question_num+1);
                
            } else {
                setAttemptNum(2);
                setGC("This is the generated Code");
                setTestCase("This are failed test cases");

            }
        } else {
            if(!correctness && attempt_num === 1){
                setAttemptNum(2);
                setGC("This is the generated Code");
                setTestCase("This are failed test cases");
            } else{
                alert("navigate!");
                navigate("/result");
            }

        }
    }

    return (
        <div className='mainCodeQuestion'>
            <div className='header'>
                <h>CodeLlamaAcademy</h>
            </div>


            <div className='question'>
                <p>Question {question_num}</p>
                <br></br>
                <p>Please describe the following code in plain English: </p>
                <br></br>
                <p>{question}</p>
            </div>

            <div>
                <form className='answer' onSubmit={handleAnsSubmit}>
                    <label>
                        Answer
                        <input 
                            type="text" 
                            name='Answer' 
                            placeholder='Type your answer here'
                            value = {answer} 
                            onChange = { (e) =>
                            {
                                setAns(e.target.value)
                            }}>  
                        </input>
                    </label>

                    <br></br>
                    
           
                    {(attempt_num === 2) && 
                    <label>
                        Reason for changing your answer
                        <input type="text" 
                            name='Reason of Change' 
                            placeholder='Type your reason for changing the answer here'
                            value = {reasonOfChange} 
                            onChange = { (e) =>
                            {
                                setReason(e.target.value)
                            }}>
                        </input>
                    </label>
                    }

                    <br></br>
                    
                    <button className='submitButton' type = "submit">Submit</button>
                </form>
                
            </div>

            <div>
                <p>{generatedCode}</p>
                <br></br>
                <p>{failedTestCase}</p>
            </div>


        </div>

    )
}

//generate the next question (the prev_result will be used for the unique feature and is always set to null for now)
function generateNext(problems, prev_result) {
    return "func sum(a, b){a+b}";
}





export default CodeQuestion