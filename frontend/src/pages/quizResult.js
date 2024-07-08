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
    )
}

export default QuizResult

