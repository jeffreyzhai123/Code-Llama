import React from 'react'
import { Link } from 'react-router-dom'

const QuizResult =()=>{

    return (
    <div> 
        <h1 className = "congrats">You have completed the quiz! Congrats!</h1> 
        <br></br>
        <Link to="/">
        <button className='backtoMain'> Go to the Main Page </button>
        </Link>
        
    </div>
    )
}

export default QuizResult

