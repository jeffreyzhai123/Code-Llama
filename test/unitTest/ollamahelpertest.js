describe('Ollama_helper', () => {
    describe("test ollama helper function", function() {

        this.timeout(120000);
        it("call ollama return non-empty string", async ()=>{
        
            const ollamaResponse = await callOllama("hello world");
            expect(ollamaResponse)
            .to
            .not
            .equal("");
            
            
        });
    
        it("call ollama return text that contains javascript code", async () =>{
      
            const ollamaResponse = await callOllama("subtract two numbers");
            expect(ollamaResponse)
            .to
            .include("```javascript");
           
        });
    
        it("call ollama with input other than english (French)", async () =>{
      
            const ollamaResponse = await callOllama("ajouter deux nombres");
            expect(ollamaResponse)
            .to
            .include("```javascript");
       
        });
    
        it("call ollama with input other than english (chinese)", async () =>{
      
            const ollamaResponse = await callOllama("两个数字之和");
            expect(ollamaResponse)
            .to
            .include("```javascript");
       
        });
    
        it("call ollama with input other than english (Korean)", async () =>{
      
            const ollamaResponse = await callOllama("두 숫자 빼기");
            expect(ollamaResponse)
            .to
            .include("```javascript");
       
        });
    
    
    })
});
