// Display performance review


const PerformanceReview = () => {

    //TODO: GET SCORES
    const scores = [
        { date: "2024-07-01", time: "8:30", score: "56%" },
        { date: "2024-07-01", time: "14:30", score: "80%" },
        { date: "2024-07-02", time: "14:30", score: "100%" },
    ];
    
    return (
        <div className='ScoreBoard'>
            <div className='Score-header'>
                <h1>CodeLlamaAcademy</h1>
            </div>

            <div className='results'>
                <h2>Performance Results</h2>
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
                            <tr key={index}>
                                <td>{score.date}</td>
                                <td>{score.time}</td>
                                <td>{score.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PerformanceReview