import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { results_var } from './codeQuestion.js'

const QuizResult =()=>{

    const navigate = useNavigate();
    const mainButton = () => {
        navigate("/");
    }

    let results = results_var;
    let score = 0;
    results.forEach((result) => {
        let pass = result.passfail;

        if (pass == true) {
            score++;
        }
    });
    let total = score/8;

    return (
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

