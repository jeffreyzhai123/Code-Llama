// Display performance review
import my_logo from '../components/CodeLlama.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';

const PerformanceReview = () => {

    const qnum = 8; // Change it to the number of questions in the quiz

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    };

    const [score, setScore] = useState([]);
    const [result, setResult] = useState([]);

    const {user} = useUser();
    let user_id = user.id;

    let grade = 0;
    let scoreArray = [];
    let resultArray = [];

    const fetchResults = async () => {
        try {
            const response = await fetch(`http:///localhost:3080/results/${user_id}`);
            if (response.ok) {
                const data = await response.json();
                if (data.userid === user.id) {
                    data.results.forEach((array, index) => {
                        array.forEach((quiz) => {
                            let quizNumber = index + 1;
                            let questionNumber = quiz.questionNum;
                            let question = quiz.question;
                            let answer = quiz.answer;
                            if (answer === "") answer = "No Input";
                            let reasonofchange = quiz.reasonofchange;
                            if (reasonofchange === "") reasonofchange = "No Input";
                            let passfail = quiz.passfail;
                            if (passfail === true) grade++;
                            passfail = passfail ? "PASS" : "FAIL";
                            let attempNumber = quiz.attemptNum;
                            let difficultyLevel = quiz.difficultyLevel;
                            let generatedCode = quiz.generatedCode;
                            if (generatedCode === "") generatedCode = "No Input";
                            let failedTestCases = quiz.failedTestCases;
                            if (failedTestCases === "") failedTestCases = "All tests passed"
                            resultArray.push({quizNumber, questionNumber, question, answer, reasonofchange, passfail, attempNumber, difficultyLevel, generatedCode, failedTestCases});
                        })
                        let quizScore = ((grade/qnum)*100).toFixed(0) + "%";
                        let quizNumber = index + 1;
                        scoreArray.push({quizNumber,quizScore});
                        grade = 0;
                    })
                }
                return [scoreArray, resultArray];
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    fetchResults().then(([scoreArray, resultArray]) => {
        setScore(scoreArray);
        setResult(resultArray);
    });
    
    const[selectedScore, setSelectedScore] = useState(null);
    const[scoreboardVisible, setScoreboardVisible] = useState(true);
    const[selectedQuestion, setSelectedQuestion] = useState(null);
    const[detailedVisible, setdetailedVisible] = useState(true);

    function handleRowClick(score) {
        setSelectedScore(score);
        setScoreboardVisible(false); // hide the scoreboard
    };

    function handleBackButtonClick() {
        setSelectedScore(null);
        setScoreboardVisible(true); // show the scoreboard
    };

    function handleRowClickTwice(questionNumber) {
        setSelectedQuestion(questionNumber);
        setdetailedVisible(false);
    }

    function handleBackButtonClickTwice() {
        setSelectedQuestion(null);
        setdetailedVisible(true);
    }

    function getDetailsForQuiz(quizID){
        let details = [];
        result.forEach((quiz) => {
            if (quiz.quizNumber === quizID) {
                details.push(quiz);
            }
        })
        return details;
    };

    function getDetailsForQuestion(quizID, questionNumber){
        let answers = [];  
        result.forEach((quiz) => {
            if (quiz.quizNumber === quizID && quiz.questionNumber === questionNumber) {
                    answers.push({
                        questionNumber: quiz.questionNumber, 
                        question: quiz.question, 
                        answer: quiz.answer, 
                        reasonofchange: quiz.reasonofchange, 
                        passFail: quiz.passfail, 
                        attempNumber: quiz.attempNumber, 
                        difficultyLevel: quiz.difficultyLevel, 
                        generatedCode: quiz.generatedCode,
                        failedTestCases: quiz.failedTestCases
                    });
                }
            });
        return answers;
    };
        
    return (
        <div className='homeContainer'>
            <header className="siteHeader">
                <div className='headerLeft'>
                    <div className='smalllogoContainer'>
                        <img src= {my_logo} alt='icon' className='smalllogo'></img>
                        <span className = "codeLlama">CodeLlamaAcademy</span>
                    </div>
                </div>

                <div className='headerRight'>
                    {scoreboardVisible && (
                        <div className='mainBtnContainer'>
                            <button className="btn btn-success" onClick={mainButton}>Go back to Main</button>
                        </div>
                    )}

                    {detailedVisible && selectedScore && (
                        <div className='mainBtnContainer'>
                            <button className="btn btn-success" onClick={handleBackButtonClick}>Go to Performance Review</button>
                        </div>
                    )}

                    {selectedQuestion && selectedScore && (
                        <div className='mainBtnContainer'>
                            <button className="btn btn-success" onClick={handleBackButtonClickTwice}>Go to Detailed Performance Review</button>
                        </div>
                    )}
                </div>
            </header>

            <div className='scoreboardContainer'>
                <span className = "performanceresultsTitle">Performance Results</span>
                    {scoreboardVisible && 
                        <table id="resultsTable">
                            <thead>
                                <tr>
                                    <th>Quiz Number</th>
                                    <th>Score</th>
                                </tr>
                            </thead>

                            <tbody>
                                {score.map((score, index) => (
                                    <tr key={index} onClick={() => handleRowClick(score)}>
                                        <td>{score.quizNumber}</td>
                                        <td>{score.quizScore}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                        

                    {detailedVisible && selectedScore && (
                        <div className="detailsTable">
                            <div className='detailedDescription'>
                                <span className = "scoreDescription"> Selected Quiz: {selectedScore.quizNumber}</span>
                                <span className = "scoreDescription"> Overall Percentage: {selectedScore.quizScore}</span>
                            </div>
                            <table id="resultsTable">
                                <thead>
                                    <tr>
                                        <th>Question Number</th>
                                        <th>Questions</th>
                                        <th>Final Answer</th>
                                        <th>Pass/Fail</th>
                                        <th>Attempt Number</th>
                                        <th>Difficulty Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getDetailsForQuiz(selectedScore.quizNumber).map((detail,index) => (
                                        <tr key={index} onClick={() => handleRowClickTwice(detail.questionNumber)}>
                                            <td>{detail.questionNumber}</td>
                                            <td>{detail.question}</td>
                                            <td>{detail.answer}</td>
                                            <td>{detail.passfail}</td>
                                            <td>{detail.attempNumber}</td>
                                            <td>{detail.difficultyLevel}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {selectedQuestion && selectedScore && (
                        <div className='detailedDescription2'>
                            {getDetailsForQuestion(selectedScore.quizNumber, selectedQuestion).map((answer, index) => (
                                <div key={index}>
                                    <span className = "scoreDescription"> Selected Question: {answer.questionNumber}</span>
                                    <span className = "detailedDescription2"> 
                                        Question: {answer.question}<br></br>
                                        Answer: {answer.answer}<br></br>
                                        Reason of Change: {answer.reasonofchange}<br></br>
                                        Pass/Fail: {answer.passFail}<br></br>
                                        Attempt Number: {answer.attempNumber}<br></br>
                                        Level of Difficulty: {answer.difficultyLevel}<br></br>
                                        Generated Code: {answer.generatedCode}<br></br>
                                        Failed Test Cases: {answer.failedTestCases}<br></br>
                                        <br></br>
                                        <br></br>
                                    </span>
                                    
                                </div>  
                            ))}
                        </div> 
                    )}
            </div>

        </div>
    );
}

export default PerformanceReview