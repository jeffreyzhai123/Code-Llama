import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { QuizContext } from '../context/QuizResultContext'

const QuizResult =()=>{
    const { sharedResult } = useContext(QuizContext);

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
                        <p>Pass/Fail: {quizItem.passfail}</p>
                        <p>Attempt Number: {quizItem.attemptNum}</p>
                    </div>
                ))}
        </div>
        <br></br>
        <Link to="/">
        <button className='backtoMain'> Go to the Main Page </button>
        </Link>
        
    </div>
        <div className='ScoreBoard'>
            <div className='Score-header'>
                <h1>CodeLlamaAcademy</h1>
            </div>

            <div>
                <h2>You have completed the quiz! Congrats!</h2>
                <br></br>
                <h3>Questions and Answers will be displayed here</h3>
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
        </div>
    )
}

export default QuizResult

