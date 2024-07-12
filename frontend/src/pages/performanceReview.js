// Display performance review
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';

const PerformanceReview = () => {

    const qnum = 6; // Change it to the number of questions in the quiz

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
                            let reasonofchange = quiz.reasonofchange;
                            let passfail = quiz.passfail;
                            if (passfail === true) grade++;
                            passfail = passfail ? "PASS" : "FAIL";
                            let attempNumber = quiz.attemptNum;
                            resultArray.push({quizNumber, questionNumber, question, answer, reasonofchange, passfail, attempNumber});
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

    function handleRowClick(score) {
        setSelectedScore(score);
        setScoreboardVisible(false); // hide the scoreboard
    };

    function handleBackButtonClick() {
        setSelectedScore(null);
        setScoreboardVisible(true); // show the scoreboard
    };

    function getDetailsForQuiz(quizID){
        let details = [];
        result.forEach((quiz) => {
            if (quiz.quizNumber === quizID) {
                details.push(quiz);
            }
        })
        return details;
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

                {selectedScore && (
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
                                    <th>Answer</th>
                                    <th>Reason of Change</th>
                                    <th>Pass/Fail</th>
                                    <th>Attempt Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getDetailsForQuiz(selectedScore.quizNumber).map((detail,index) => (
                                    <tr key={index}>
                                        <td>{detail.questionNumber}</td>
                                        <td>{detail.question}</td>
                                        <td>{detail.answer}</td>
                                        <td>{detail.reasonofchange}</td>
                                        <td>{detail.passfail}</td>
                                        <td>{detail.attempNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}

export default PerformanceReview