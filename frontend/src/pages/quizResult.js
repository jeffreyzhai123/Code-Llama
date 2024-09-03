import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuizContext } from '../context/QuizResultContext'
import my_logo from '../components/CodeLlama_Academy.GIF'

const QuizResult =()=>{
    //use the data shared by codeQuestion 
    const { sharedResult } = useContext(QuizContext);

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    }

    //caculate the score based on the quiz result
    let results = sharedResult;
    let score = 0;
    results.forEach((result) => {
        let pass = result.passfail;
        if (pass === true) score++;
    })

    return (
    <div className='homeContainer'> 
        <header className='siteHeader'>
            <div className='headerLeft'>
                <div className='smalllogoContainer'>
                    <img src= {my_logo} alt='icon' className='smalllogo'></img>
                    <span className = "codeLlama">CodeLlamaAcademy</span>
                </div>
            </div>

            <div className='headerRight'>
                <div className='mainBtnContainer'>
                    <button className="btn btn-success" onClick={mainButton}>Go back to Main</button>
                </div>
            </div>
        </header>

        
        {/* Display each quiz result item */}
        <div className="quiz-results">
            <h1 className = "congrats">You have completed the quiz! Congrats!</h1> 
            <br></br>
                {sharedResult.map((quizItem, index) => (
                    <div key={index} className="quiz-item">
                        <h2 className='QuestionNum'>Question {quizItem.questionNum}</h2>
                        <div className='ResultItems'>
                            <p>Question: {quizItem.question}</p>
                            <p>Answer: {quizItem.answer === "" ? "NA" : quizItem.answer}</p>
                            <p>Reason of Change: {quizItem.reasonofchange === "" ? "NA" : quizItem.reasonofchange}</p>
                            <p>Pass/Fail: {quizItem.passfail ? "pass" : "fail"}</p>
                            <p>Attempt Number: {quizItem.attemptNum}</p>
                            <p>Level of Difficulty: {quizItem.difficultyLevel}</p>
                            <p>Generated Code: {quizItem.generatedCode}</p>
                        </div>
                    </div>
                ))}
        </div>
        <br></br>
        <h1 className='QuizScore'>Quiz Results: {score}/8</h1>
        
    </div>
    )
}

export default QuizResult

