//dispaly code questions
import my_logo from '../components/CodeLlama.png'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { QuizContext } from '../context/QuizResultContext';

const quizStart = new Date().toLocaleString();

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
    const [currDifficulty, setCurrentDifficulty] = useState(1);

    //go to other page
    let navigate = useNavigate();
    //diable the double submission while waiting
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [userExistence, setUserExistence] = useState(false);

    //const problem_bank = null;
    const [easyQuestionBank, setEasyQuestionBank] = useState([]);
    const [mediumQuestionBank, setMediumQuestionBank] = useState([]);
    const [hardQuestionBank, setHardQuestionBank] = useState([]);
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

    //all users
    const [userArray, setUserArray] = useState([]);
    //quiz start time
    

    useEffect( () => {
        
        //could be refactored more by passing in the setter function 
        //but my head hurts already
        const fetchQuestions = async (type) => {

            try {
                const response = await fetch(`http://localhost:3080/question/${type}`);
                if (response.ok) {
                    const questions = await response.json();
                    if (type === "easy") {
                        setEasyQuestionBank(questions);
                        setQuestion(questions[0].question || '');
                    }
                    if (type === "medium") {
                        setMediumQuestionBank(questions);
                    }
                    if (type === "hard") {
                        setHardQuestionBank(questions);
                    }
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

        const fetchAllUsers = async () => {
            try {
                const response = await fetch(`http://localhost:3080/profile`)
                if (response.ok) {
                    const users = await response.json();
                    setUserArray(users);
                    console.log("array is being updated, useEffect triggered");
                }
            } catch (error) {
                console.log("fetched failed")
            }
        };

        fetchUser();
        fetchAllUsers();
        fetchQuestions('easy');
        fetchQuestions('medium');
        fetchQuestions('hard');
        setLoading(false);

    }, [user_id, userExistence]); //empty dependency array to make sure question bank is only fetched once 

    const createResult = async () => {
        try {

            const payload = {
                userid: user.id,
                username: "llama" + String(userArray.length + 1),
                quizResult: quizResult
            };
            console.log('Payload:', payload);

            const response = await fetch('http://localhost:3080/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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

    //key is to have a copy of the state variable, update it and use it to select questions
    //then update the actual state variable with the value of the copy

    //if try to update state variable first then use it
    //unexpected behavior occurs due to the async nature of the useState update

    const getNextQuestion = (correctness) => {
        let nextQuestion;
        let newDifficulty = currDifficulty;
        
        if(correctness) {
            newDifficulty = Math.min(currDifficulty + 1, 3);
        } else {
            newDifficulty = Math.max(currDifficulty - 1, 1);
        }

        switch (newDifficulty) {
            case 1:
                nextQuestion = easyQuestionBank[question_num].question;
                break;
            case 2:
                nextQuestion = mediumQuestionBank[question_num].question;
                break;
            case 3:
                nextQuestion = hardQuestionBank[question_num].question;
                break;
            default:
                nextQuestion = easyQuestionBank[question_num].question;
        }
        setCurrentDifficulty(newDifficulty);
        return nextQuestion;
    };

    const convertLevelofDifficulty = (currDifficulty) => {
        if (currDifficulty === 1) return "Easy"
        else if (currDifficulty === 2) return "Moderate"
        else return "Hard"
    };

    


    //function that handle submit=> ask backend right or wrong and decide what to do next
    //correct + first attempt: update the question variable + update question number + attemp_num stay at 1
    //incorrect + first attempt: update attemp_num to 2 + display additional component related to the second attempt
    //correct/incorrect + second attempt: update the question variable + reset attemp_num to 1 + update question number
    //incorrect + first attempt (last question): update attemp_num to 2 + display additional component related to the second attempt
    //correct + first attempt (last question) & correct/incorrect + second attempt (last question): redirect to the quiz result page
    async function handleAnsSubmit(event, skip) {
        event.preventDefault();

        //disable submit while waiting for answers
        setSubmitDisabled(true);

        let correctness;
        let failedTests;
        let code;
        let answerObject;
        console.log(currDifficulty);
        try {
            console.log("Inside try block");
            //sending API request to the backend
            if (skip) {
                answerObject = {ans: "", no: question_num, diff: currDifficulty};
            } else {
                answerObject = { ans: answer, no: question_num, diff: currDifficulty};
            }
            console.log("ready to fetch");
            console.log("frontend: ", answerObject);
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
                failedTests = data.failedTests;
                code = data.generatedCode;
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
            attemptNum: attempt_num,
            startTime: quizStart,
            endTime: new Date().toLocaleString(),
            difficultyLevel: convertLevelofDifficulty(currDifficulty),
            generatedCode: code,
            failedTestCases: failedTests
        };
        console.log(quizJSon)

        const temporaryArray = quizResult;
        temporaryArray.push(quizJSon);
        console.log(temporaryArray);
        console.log(generatedCode)
        setQuizResult(temporaryArray);
        
        //set limit to 6 as there are only 6 questions thus far
        //if skip is true just jump to next question lol?
        if(question_num < 8) {
            if(attempt_num === 2 || correctness || skip){

                setQuestionNumber(question_num+1);
                setAttemptNum(1);
                setQuestion(getNextQuestion(correctness));

                //default
                //setQuestion(easyQuestionBank[question_num].question);
                
            } else {
                setAttemptNum(2);
            }

        } else {
            if(!correctness && attempt_num === 1 && !skip){
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
    };

    function handleSkip(event) {
        handleAnsSubmit(event, true);
    }

    return (
        <div className="homeContainer">
            <header className='siteHeader'>
                <div className='headerLeft'>
                    <div className='smalllogoContainer'>
                        <img src= {my_logo} alt='icon' className='smalllogo'></img>
                        <span className = "codeLlama">CodeLlamaAcademy</span>
                    </div>
                </div>
            </header>
            <div className='mainCodeQuestion'>
                
            
                {loading ? (
                    <p>Loading...</p>
                ) : ( 
                    <>
                    <div className='question'>
                        <h2>Question {question_num} </h2>
                        
                        {convertLevelofDifficulty(currDifficulty) === "Easy" &&
                        <div className='easyLevelTag'>
                            <span>{convertLevelofDifficulty(currDifficulty)}</span>
                        </div>
                        }

                        {convertLevelofDifficulty(currDifficulty) === "Moderate" &&
                        <div className='modLevelTag'>
                            <span>{convertLevelofDifficulty(currDifficulty)}</span>
                        </div>
                        }

                        {convertLevelofDifficulty(currDifficulty) === "Hard" &&
                        <div className='hardLevelTag'>
                            <span>{convertLevelofDifficulty(currDifficulty)}</span>
                        </div>
                        }
                        
                        <p>Please describe the following code in plain English: </p>
                        <br></br>
                                                
                        <pre className='codeContainer'>
                            <code className='code'>
                                {question}
                            </code>
                        </pre>
                            
                        

                        {(attempt_num === 2) && 
                            <div className='secondAttempt'>
                                <br></br>
                                <p>Here is the generated code: </p>
                                <br></br>
                                <p id='generatedCode'>{generatedCode}</p>
                                <br></br>
                                <pre>{failedTestCase}</pre>
                            </div>
                        }                        
                    </div>

                    <div className='answer'>
                        <div className='skipBtnContainer'>
                            <button className='skipButton' type = "button" disabled={submitDisabled} onClick = {handleSkip}>Skip</button>
                        </div>
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

                    
                    </>
                )}
            </div>
        </div>
    )
}

export default CodeQuestion