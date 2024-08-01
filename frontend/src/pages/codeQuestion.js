//dispaly code questions
import my_logo from '../components/CodeLlama.png'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { QuizContext } from '../context/QuizResultContext';
import { convertLevelofDifficulty } from '../helpers/codeQuestionHelpers';

const QUIZ_START = new Date().toLocaleString();

const CodeQuestion = () => {

    //share the quiz result data with quiz result page
    const { setSharedResult } = useContext(QuizContext);
    //help to go to another page
    let navigate = useNavigate();

    //get user data (from clerk)
    const {user} = useUser();
    const user_id = user.id;
    //can be used to identify users when storing to database
    const userEmail = user.primaryEmailAddress.emailAddress;
    const [userExistence, setUserExistence] = useState(false);

    const [quizResult, setQuizResult] = useState([]);

    const [currDifficulty, setCurrentDifficulty] = useState(1);
    const [easyQuestionBank, setEasyQuestionBank] = useState([]);
    const [mediumQuestionBank, setMediumQuestionBank] = useState([]);
    const [hardQuestionBank, setHardQuestionBank] = useState([]);
    const [loading, setLoading] = useState(true); //to prevent app from running before questions are pulled

    //question number
    const [question_num, setQuestionNumber] = useState(1);
    //question content
    const [question, setQuestion] = useState("");
    //attempt number
    const [attempt_num, setAttemptNum] = useState(1);
    //user answer
    const [answer, setAns] = useState("");
    //elements for second attempt
    const [generatedCode, setGC] = useState("");
    const [failedTestCase, setTestCase] = useState("");
    const [reasonOfChange, setReason] = useState("");

    //all users
    const [userArray, setUserArray] = useState([]);

    //disable the double submission while waiting
    const [submitDisabled, setSubmitDisabled] = useState(false);

    
    //when render, get all problems into three arrays based on difficulty level; decide whether the user has done quiz or not (exist or not in our result database)
    //and get all users (for later use to determine how many users are already in database to setup default username)
    useEffect( () => {
        
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
            } catch (error) {
                console.error("Error: ", error);
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

    }, [userExistence]); 

    //create a user with their first quiz result in the database
    const createResult = async () => {
        try {

            const newUser = {
                userid: user.id,
                username: "llama" + String(userArray.length + 1),
                quizResult: quizResult
            };
            console.log('New user:', newUser);

            const response = await fetch('http://localhost:3080/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
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
    
    //add new quiz results for an existing user
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
            newDifficulty = currDifficulty === 3 ? 3 : currDifficulty + 1;
        } else {
            newDifficulty = currDifficulty === 1 ? 1 : currDifficulty - 1;
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

 
    


    //function that can be triggered by clicking submit or skip; ask backend right or wrong and decide what to do next
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
            //handle skip differently from normal case
            if (skip) {
                answerObject = {ans: "", no: question_num, diff: currDifficulty};
            } else {
                answerObject = { ans: answer, no: question_num, diff: currDifficulty};
            }
            console.log("ready to fetch");
            console.log("frontend: ", answerObject);
            const backendResponse = await fetch('http://localhost:3080/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answerObject)
            });

            //recieve and check the result giving back from the backend
            if (backendResponse.ok) {
                const resultData = await backendResponse.json();
                console.log(resultData.message);
                console.log(resultData.correctness);
                console.log(resultData.failedTests);
                console.log(resultData.generatedCode);

                correctness = resultData.correctness;
                setTestCase(resultData.failedTests)
                failedTests = resultData.failedTests;
                code = resultData.generatedCode;
                setGC(resultData.generatedCode);

            } else {
                console.error('Failed to get response from backend');
            }

        } catch (error) {
            
            console.error('ERROR: ', error);
        }

        //create Json object to hold question info in the quiz, update current quiz results and view them in the console
        const quizJSon = {
            questionNum : question_num, 
            question: question,
            answer: answer,
            reasonofchange: reasonOfChange,
            passfail: correctness,
            attemptNum: attempt_num,
            startTime: QUIZ_START,
            endTime: new Date().toLocaleString(),
            difficultyLevel: convertLevelofDifficulty(currDifficulty),
            generatedCode: code,
            failedTestCases: failedTests
        };
        console.log(quizJSon);
        const temporaryArray = quizResult;
        temporaryArray.push(quizJSon);
        console.log(temporaryArray);
        console.log(generatedCode);
        setQuizResult(temporaryArray);
        
        //set limit to 8 as there are 8 questions thus far
        if(question_num < 8) {
            if(attempt_num === 2 || correctness || skip){

                setQuestionNumber(question_num+1);
                setAttemptNum(1);
                setQuestion(getNextQuestion(correctness));
                
            } else {
                setAttemptNum(2);
            }

        } else {
            if(!correctness && attempt_num === 1 && !skip){
                setAttemptNum(2);
            } else {
                //end of the quiz and storing data
                setSharedResult(quizResult);
                console.log(quizResult.length);
                alert("Congratulations " + userEmail + "! You have finished the quiz. Please click Ok to see the result.");
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
                {/*  question and information section  */}
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

                    {/*  user inputs section  */}
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