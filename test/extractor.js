
//extracts code from ollama llm response and returns it 
function extract(response) {
    //find startingIndex by looking for "javascript" and adding 10 to skip this word
    const startIndex = response.indexOf('javascript') + 10;

    //find the index of the closing backtick '`' that marks the end of the response
    const endIndex = response.indexOf('`', startIndex);

    //extract the code block from the response based on the indices 
    const extracted = response.substring(startIndex, endIndex);
    return extracted;
}

