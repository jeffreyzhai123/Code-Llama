const NUM_OF_QUESTION = 8;
const ESCALE = 0.6;
const MSCALE = 0.8;
const HSCALE = 1;

//unscaled version: all the question has the same weight despite of difference in difficulty

//calculate the average score of average score of all users
function calculateAllAvg(userarr){
    let totalScore = 0;

    userarr.forEach(user => {
        totalScore += calculateAvgScore(user.results);
    });

    return totalScore/userarr.length;

}



//calculate the average score of all quizzes of a single user
function calculateAvgScore(loq) {
    let totalScore = 0;
    loq.forEach(quiz => {
        totalScore += calculateScore(quiz);
    });

    return 100*(totalScore/loq.length);

}



//calulate the score of this quiz
function calculateScore(quiz){
    let correct = 0;
    quiz.forEach(question => {
        if(question.passfail) {
            correct++;
        }
    });
    
    return correct/NUM_OF_QUESTION;

}

//scaled version: max score is 7.4, with hard question to worth 1, medium question to worth 0.8, and easy question to worth 0.6

//calculate the average score of average score of all users
function calculateAllScaledAvg(userarr){
    let totalScore = 0;

    userarr.forEach(user => {
        totalScore += calculateAvgScaledScore(user.results);
    });

    return totalScore/userarr.length;

}



//calculate the average scaled score of all quizzes of a single user
function calculateAvgScaledScore(loq) {
    let totalScore = 0;
    loq.forEach(quiz => {
        totalScore += calcultateScaledScore(quiz);
    });

    return 100*(totalScore/loq.length);

}




//calulate the scaled score of this quiz
function calcultateScaledScore(quiz){
    let correct = 0;
    quiz.forEach(question => {
        if(question.passfail) {
            if(question.difficultyLevel === "Easy") {
                correct += 0.6;
            } else if(question.difficultyLevel === "Moderate"){
                correct += 0.8;
            } else{
                correct++;
            }
        }
    });
    
    return correct/(ESCALE + MSCALE + HSCALE * (NUM_OF_QUESTION - 2));

}


