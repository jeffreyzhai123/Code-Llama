//dispaly code questions

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CodeQuestion = () => {

    //go to other page
    let navigate = useNavigate();
    //const problem_bank = null;
    const [questionBank, setQuestionBank] = useState([]);
    const [loading, setLoading] = useState(true); //to prevent app from running before questions are pulled

    //get first question and question number; initialize attempt number to 1st attempt
    const [question_num, setQuestionNumber] = useState(1);
    const [question, setQuestion] = useState("");
    const [attempt_num, setAttemptNum] = useState(1);
    //user answer
    const [answer, setAns] = useState("");
    //element for second attempt
    const [generatedCode, setGC] = useState("");
    const [failedTestCase, setTestCase] = useState("");
    const [reasonOfChange, setReason] = useState("");

    useEffect( () => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:3080/question');
                if(response.ok) {
                    const questions = await response.json();
                    setQuestionBank(questions);
                    setQuestion(questions[0]?.question || '');
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error: ", err);
            }
        };
        fetchQuestions();
    }, []); 

    //function that handle submit=> ask backend right or wrong and decide what to do next
    //correct + first attempt: update the question variable + update question number + attemp_num stay at 1
    //incorrect + first attempt: update attemp_num to 2 + display additional component related to the second attempt
    //correct/incorrect + second attempt: update the question variable + reset attemp_num to 1 + update question number
    //incorrect + first attempt (last question): update attemp_num to 2 + display additional component related to the second attempt
    //correct + first attempt (last question) & correct/incorrect + second attempt (last question): redirect to the quiz result page
    async function handleAnsSubmit(event) {
        event.preventDefault();

        //to check if questions are being pulled successfully. (use inspect elements to see)
        console.log(questionBank);
        let correctness;
        try {
            //sending API requestion to the backend
            const answerObject = { ans: answer };
            console.log("ready to fetch");
            const res = await fetch('http://localhost:3080/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answerObject)
            });

            //check the result giving back from the backend
            if (res.ok) {
                const data = await res.json();
                console.log(data.message);
                console.log(data.correctness);
                console.log(data.failedTests);
                console.log(data.generatedCode);
                correctness = data.correctness;
                setTestCase(data.failedTests)
                setGC(data.generatedCode);

            } else {
                console.error('Failed to get response from backend');
            }

        } catch (error) {
            //handle network error or other errors 
            console.error('ERROR: ', error);
        }

        //set limit to 6 as there are only 6 questions thus far
        if(question_num < 6) {
            if(attempt_num === 2 || correctness){
                setQuestion(questionBank[question_num].question);
                setAttemptNum(1);
                setQuestionNumber(question_num+1);
                
            } else {
                setAttemptNum(2);
            }

        } else {
            if(!correctness && attempt_num === 1){
                setAttemptNum(2);
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

            {loading ? (
                <p>Loading...</p>
            ) : ( 
                <>
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

                {(attempt_num === 2) && 
                <div>
                    <p>{generatedCode}</p>
                    <br></br>
                    <p>{failedTestCase}</p>
                </div>
                }
                </>
            )}
        </div>
    )
}

//generate the next question (the prev_result will be used for the unique feature and is always set to null for now)
function generateNext(problems, prev_question_num) {
    let curr = prev_question_num + 1;
    if (problems[curr]?.question) {
        return problems[curr].question;
    } else {
        return "uh-oh"; // or any fallback value if question is not found
    }
}


export default CodeQuestion