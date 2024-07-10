//import { Ollama } from 'ollama'

//partly inspired by documentation from https://github.com/ollama/ollama-js
//calls Ollama's api using the chat method
//we can give users options to what LLM they want to use (just pass in additional param)
// const APIHOST = process.env.OLLAMA_HOST_NAME || "localhost";
// const APIURL = "http://" + APIHOST + ":11434";
// const ollama = new Ollama({host:APIURL});

//Require: this funtion should not be called with an empty input
async function callOllama(input) {
    //console.log(APIURL);
    try {
        //makes async call to ollama and store result in response
        const response = await ollama.chat({
            model: 'mistral', //placeholder
            messages: [{
                role: 'user',
                content: "Generate a javascript function with the provided description: " + input + ". Name this function TestFunction"
            }]
        })
        return response.message.content;
    } catch (error) {
        //display error message and throw to main function to deal with
        console.error('Error: ', error.message);
        throw error;
    }
}