import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuizContext } from '../context/QuizResultContext'

const QuizResult =()=>{
    const { sharedResult } = useContext(QuizContext);

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    }

    let results = sharedResult;
    let score = 0;
    results.forEach((result) => {
        let pass = result.passfail;
        if (pass === true) score++;
    })

    return (
    <div> 
        <h1 className = "congrats">You have completed the quiz! Congrats!</h1> 
        <br></br>
        {/* Display each quiz result item */}
        <div className="quiz-results">
                {sharedResult.map((quizItem, index) => (
                    <div key={index} className="quiz-item">
                        <h2>Question {quizItem.questionNum}</h2>
                        <p>Question: {quizItem.question}</p>
                        <p>Answer: {quizItem.answer}</p>
                        <p>Reason of Change: {quizItem.reasonofchange}</p>
                        <p>Pass/Fail: {quizItem.passfail ? "pass" : "fail"}</p>
                        <p>Attempt Number: {quizItem.attemptNum}</p>
                        <p>Level of Difficulty: {quizItem.difficultyLevel}</p>
                        <p>Generated Code: {quizItem.generatedCode}</p>
                    </div>
                ))}
        </div>
        <br></br>
        <h1>Quiz Results: {score}/8</h1>
                <div className={'buttonContainer'}>
                    <input
                        className={'inputButton'}
                        type="button"
                        onClick={mainButton}
                        value="Go to the Main Page"
                    />
                </div>
        
    </div>
    )
}

export default QuizResult

