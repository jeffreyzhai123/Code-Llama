// Display performance review
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
        <div className='ScoreBoard'>
            <div className='Score-header'>
                <h1>CodeLlamaAcademy</h1>
            </div>

            <div className='results'>
                <h2>Performance Results</h2>
                {scoreboardVisible && 
                    <table>
                        <thead>
                            <tr>
                                <th>Quiz Number</th>
                                <th>Score</th>
                            </tr>
                        </thead>

                        <tbody>
                            {score.map((score, index) => (
                                <tr key={index} onClick={() => handleRowClick(score)} className="clickable-row">
                                    <td>{score.quizNumber}</td>
                                    <td>{score.quizScore}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

                {scoreboardVisible && (
                    <div className={'buttonContainer'}>
                        <input
                            className={'inputButton'}
                            type="button"
                            onClick={mainButton}
                            value="Go to the Main Page"
                        />
                    </div>
                )}

                {detailedVisible && selectedScore && (
                    <div className="details-table">
                        <div className={'buttonContainer'}>
                            <button onClick={handleBackButtonClick}>Go to Performance Review</button>
                        </div>
                        <h2>Details for Quiz {selectedScore.quizNumber}</h2>
                        <h3>Score: {selectedScore.quizScore}</h3>
                        <table>
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
                                    <tr key={index} onClick={() => handleRowClickTwice(detail.questionNumber)} className="clickable-row">
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
                    <div className='answer-table'>
                        <div className={'buttonContainer'}>
                            <button onClick={handleBackButtonClickTwice}>Go to Detailed Performance Review</button>
                        </div>
                        
                        {getDetailsForQuestion(selectedScore.quizNumber, selectedQuestion).map((answer, index) => (
                            <div key={index} className="question-item">
                                <h2>Question {answer.questionNumber}</h2>
                                <p>Question: {answer.question}</p>
                                <p>Answer: {answer.answer}</p>
                                <p>Reason of Change: {answer.reasonofchange}</p>
                                <p>Pass/Fail: {answer.passFail}</p>
                                <p>Attempt Number: {answer.attempNumber}</p>
                                <p>Level of Difficulty: {answer.difficultyLevel}</p>
                                <p>Generated Code: {answer.generatedCode}</p>
                                <p>Failed Test Cases: {answer.failedTestCases}</p>
                            </div>  
                        ))}
                           
                    </div>
                )}
            </div>

        </div>
    );
}

export default PerformanceReview