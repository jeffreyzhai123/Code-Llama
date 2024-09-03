import React, { createContext, useState } from 'react';

//help sharing the quiz result temporarily stored in codeQuestion with quizResult page by using context
export const QuizContext = createContext();

export const QuizResultProvider = ({children}) => {
    const [sharedResult, setSharedResult] = useState([]);

    return (
        <QuizContext.Provider value = {{sharedResult, setSharedResult}}>
            {children}
        </QuizContext.Provider>
    );
};