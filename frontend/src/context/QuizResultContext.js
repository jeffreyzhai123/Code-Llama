import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizResultProvider = ({children}) => {
    const [sharedResult, setSharedResult] = useState([]);

    return (
        <QuizContext.Provider value = {{sharedResult, setSharedResult}}>
            {children}
        </QuizContext.Provider>
    );
};