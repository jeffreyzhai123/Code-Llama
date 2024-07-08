// Display performance review
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const PerformanceReview = () => {

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    } 
    const backButton = () => {
        navigate("/performanceReview");
    }

    //TODO: GET SCORES
    const scores = [
        { date: "2024-07-01", time: "8:30", score: "56%", 
            details: [{question: "Add two integers", passfail: "Fail"}]},
        { date: "2024-07-01", time: "14:30", score: "80%",
            details: [{question: "Multiply two integers", passfail: "Fail"}]},
        { date: "2024-07-02", time: "14:30", score: "100%",
            details: [{question: "Find the difference of two integers", passfail: "PASS"}]},
    ];

    const[selectedScore, setSelectedScore] = useState(null);
    const[scoreboardVisible, setScoreboardVisible] = useState(true);

    function handleRowClick(score) {
        setSelectedScore(score);
        setScoreboardVisible(false); // hide the scoreboard
    };

    function handleBackButtonClick() {
        setSelectedScore(null);
        setScoreboardVisible(true); // show the scoreboard
    }
    
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
                                <th>Date</th>
                                <th>Time</th>
                                <th>Score</th>
                            </tr>
                        </thead>

                        <tbody>
                            {scores.map((score, index) => (
                                <tr key={index} onClick={() => handleRowClick(score)} className="clickable-row">
                                    <td>{score.date}</td>
                                    <td>{score.time}</td>
                                    <td>{score.score}</td>
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
                        <h2>Details for {selectedScore.date} {selectedScore.time}</h2>
                        <table>
                            <thread>
                                <tr>
                                    <th>Questions</th>
                                    <th>Pass/Fail</th>
                                </tr>
                            </thread>
                            <tbody>
                                {selectedScore.details.map((detail,index) => (
                                    <tr key={index}>
                                        <td>{detail.question}</td>
                                        <td>{detail.passfail}</td>
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