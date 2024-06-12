# CodeLlamaAcademy
Team Members: Emma Park, Hejia Qiu, Jeffrey Zha, Yining Zhong<br/><br/>

# Project Description
CodeLlamaAcademy is a simple web application that allows users to test their code interpretation skill. <br/>

This application will have multiple frontend elements and backend elements that communicate with each other. 
The application frontend provides a sign-up page for users to create an account. 
The backend will handle the sign-up and store users’ information like username and password. 
Upon creating an account users can then login in and the backend will handle the authentication. 
After successfully logging into the application, the user will see a menu page, and they can navigate to either start a new set of code comprehension exercises or view their history data by clicking on the corresponding button. 
If the user chooses to start a new set of exercises, the application will display a simple function and prompt the user for a response. 
The response would then be reformatted to be used in an API call to Ollama from the backend. 
Ollama will proceed to use a LLM to generate code based on user input and communicate back to the backend.
The generated code will be run against a set of pre-written tests to determine if the generated code is functionally equivalent to the question. 
If the test results are all correct the user will move onto the next question. Otherwise, test results and generated code will be provided to the user to aid in subsequent tries. 
After finishing the exercises, they will be directed back to the menu. 
The application also will persist all relevant data for each trial for users such as questions completed, date of completion, and time used to assist in future analysis. 
The users’ data will be displayed in the history summary page and can be seen by themselves if they navigate to the history summary page at the menu. 


# Setup

# Configuration Details
