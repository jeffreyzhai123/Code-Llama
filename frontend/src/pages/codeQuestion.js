//dispaly code questions

import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { QuizContext } from '../context/QuizResultContext';

const CodeQuestion = () => {

    const { setSharedResult } = useContext(QuizContext);
    //get user info
    const {user} = useUser();
    //get user data 
    const user_id = user.id;

    //can be used to identify users when storing to database
    const userEmail = user.primaryEmailAddress.emailAddress;

    //quiz result
    const [quizResult, setQuizResult] = useState([]);

    //go to other page
    let navigate = useNavigate();
    //diable the double submission while waiting
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [userExistence, setUserExistence] = useState(false);

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

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3080/results/${user_id}`)
                if (response.ok) {
                    await response.json();
                    setUserExistence(true);
                    console.log("user exist");
                } else {
                    throw new Error('Failed to fetch userid');
                }
            } catch (error) {
                console.log("user does not exist");
                setUserExistence(false);
            }
        };
        fetchUser()
        fetchQuestions();
    }, [user_id, userExistence]); //empty dependency array to make sure question bank is only fetched once 

    /* useEffect(() => {
        const createResult = async () => {
            try {
                let newArray = [quizResult];
                const response = await fetch('http://localhost:3080/results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userid: user.id,
                        quizResult: newArray
                    })
                });

                if(!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const updateResult = async () => {
            try {
                const response = await fetch(`http://localhost:3080/results/${user_id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      quizResult: quizResult,
                    }),
                });

                if(!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const handleQuizEnd = async () => {
            if (!userExistence) {
                await createResult();
            } else {
                await updateResult();
            }
            alert("navigate!" + userEmail);
            navigate("/result");
        };

        //if quiz completed and user doesn't exist create new user object

        if (quizResult.length === 12) {
            console.log("quiz ended");
            handleQuizEnd();
            if (!userExistence) {
                createResult();
            } else {
                updateResult();
            }
        }
    }, [question_num, user, quizResult, userExistence, user_id]); */

    const createResult = async () => {
        try {
            const response = await fetch('http://localhost:3080/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: user.id,
                    quizResult: quizResult
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const updateResult = async () => {
        try {
            const response = await fetch(`http://localhost:3080/results/${user_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quizResult: quizResult,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    //function that handle submit=> ask backend right or wrong and decide what to do next
    //correct + first attempt: update the question variable + update question number + attemp_num stay at 1
    //incorrect + first attempt: update attemp_num to 2 + display additional component related to the second attempt
    //correct/incorrect + second attempt: update the question variable + reset attemp_num to 1 + update question number
    //incorrect + first attempt (last question): update attemp_num to 2 + display additional component related to the second attempt
    //correct + first attempt (last question) & correct/incorrect + second attempt (last question): redirect to the quiz result page
    async function handleAnsSubmit(event) {
        event.preventDefault();

        //disable submit while waiting for answers
        setSubmitDisabled(true);

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

        //update current quiz results and view them in the console
        const quizJSon = {
            questionNum : question_num, 
            question: question,
            answer: answer,
            reasonofchange: reasonOfChange,
            passfail: correctness,
            attemptNum: attempt_num
        };
        const temporaryArray = quizResult;
        temporaryArray.push(quizJSon);
        console.log(temporaryArray);
        setQuizResult(temporaryArray);
        

        //set limit to 6 as there are only 6 questions thus far
        if(question_num < 6) {
            if(attempt_num === 2 || correctness){
                setQuestion(questionBank[question_num].question);
                setQuestionNumber(question_num+1);
                setAttemptNum(1);
                
            } else {
                setAttemptNum(2);
            }

        } else {
            if(!correctness && attempt_num === 1){
                setAttemptNum(2);
            } else {
                //end of the quiz
                //TODO: send the quizResult to page that needs it and store the result in database 
                setSharedResult(quizResult);
                console.log(quizResult.length);
                alert("navigate!" + userEmail);
                console.log("before conditional " + userExistence);
                if (!userExistence) {
                    console.log("create user");
                    await createResult();
                } else {
                    console.log("update user");
                    await updateResult();
                }
    
                navigate("/result");
            } 
        }

        //empty the input box for the next question
        setAns("");
        setReason("");

        //re-able submit
        setSubmitDisabled(false);
    }

    return (
        <div className='mainCodeQuestion'>
            <div className='Score-header'>
                <h1>CodeLlamaAcademy</h1>
            </div>
           
            {loading ? (
                <p>Loading...</p>
            ) : ( 
                <>
                <div className='question'>
                    <h2>Question {question_num}</h2>
                 
                    <p>Please describe the following code in plain English: </p>
                    <br></br>
                    <p>{question}</p>
                </div>

                <div className='answer'>
                <form onSubmit={handleAnsSubmit}>
                    <br></br>
                    <label>
                        Answer
                        <br></br>
                        <input
                            className='input' 
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
                        <br></br>
                        <input
                            className='input' 
                            type="text" 
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
                    <br></br>
                        <button className='submitButton' type = "submit" disabled = {submitDisabled}>Submit</button>
                    </form>
                
                </div>

                {(attempt_num === 2) && 
                <div className='secondAttempt'>
                    <br></br>
                    <p>Here is the generated code: </p>
                    <br></br>
                    <p id='generatedCode'>{generatedCode}</p>
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
//not in use in this sprint
function generateNext(problems, prev_question_num) {
    let curr = prev_question_num + 1;
    if (problems[curr]?.question) {
        return problems[curr].question;
    } else {
        return "uh-oh"; // or any fallback value if question is not found
    }
}

// Result variable exported to quizResult
// export let results_var = [{"questionNum": {"$numberInt":"1"},
//     "question":"def foo(a,b): return a+b",
//     "answer":"Add two integers",
//     "reasonofchange":"",
//     "passfail": true,
//     "attemptNum": {"$numberInt":"1"},},
//     {"questionNum": {"$numberInt":"2"},
//         "question":"def foo(a,b): return a-b",
//         "answer":"Add two integers",
//         "reasonofchange":"",
//         "passfail":false,
//         "attemptNum": {"$numberInt":"1"}},
//     {"questionNum":{"$numberInt":"2"},
//         "question":"def foo(a,b): return a-b",
//         "answer":"Subtract two integers",
//         "reasonofchange":"Changed add to subtract",
//         "passfail":true,
//         "attemptNum":{"$numberInt":"2"}},
//     {"questionNum":{"$numberInt":"3"},
//         "question":"def foo(a,b): return ab",
//         "answer":"Subtract two integers",
//         "reasonofchange":"Subtract two integers",
//         "passfail":false,
//         "attemptNum":{"$numberInt":"1"}},
//     {"questionNum":{"$numberInt":"3"},
//         "question":"def foo(a,b): return ab",
//         "answer":"Subtract two integers",
//         "reasonofchange":"I don't get it",
//         "passfail":false,
//         "attemptNum":{"$numberInt":"2"}}];

export default CodeQuestion