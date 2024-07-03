import ollama from 'ollama'

//calls Ollama's api using the chat method
//we can give users options to what LLM they want to use (just pass in additional param)
export async function callOllama(input) {
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