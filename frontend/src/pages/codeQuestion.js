//dispaly code questions

import React from 'react'
import { useState } from 'react';

const CodeQuestion = () =>{
    //communicate with the backend to get all questions as a json array
    const problem_bank = null;

    //get first question and question number; initialize attempt number to 1st attempt
    const question_num = 1;
    const question = generateNext(problem_bank, null);
    const attempt_num = 1;
    //user answer
    const [answer, setAns] = useState("");

    //function that handle submit=> ask banckend right or wrong and decide what to do next

    //correct + first attempt: update the question variable + update question number
    //incorrect + first attempt: update attemp_num to 2 + display additional component related to the second attempt

    //correct/incorrect + second attempt: update the question variable + reset attemp_num to 1 + update question number

    
    //incorrect + first attempt (last question): update the question variable + reset attemp_num to 1 + update question number

    //correct + first attempt (last question) & correct/incorrect + second attempt (last question): redirect to the quiz result page
    function handleAnsSubmit(event) {
        event.preventDefault();

        alert("your input is " + answer);
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
                    <input 
                        type="text" 
                        name='Answer' 
                        placeholder='Type your answer here'
                        value = {answer} 
                        onChange = { (e) =>
                        {
                            setAns(e.target.value)
                        }
                        }>  
                    </input>
                    <button className='submitButton' type = "submit">Submit</button>
                </form>
                
            </div>

        
  

        </div>

    )
}

//generate the next question (the prev_result will be used for the unique feature and is always set to null for now)
function generateNext(problems, prev_result) {
    return "func sum(a, b){a+b}";
}


export default CodeQuestion