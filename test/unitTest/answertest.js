describe ('Answer', () => {
    describe("test recieve answer API helper function", function() {
        this.timeout(180000);
        it("make api call when answer is empty", async ()=>{
        
            const res = await fetch('http://localhost:3080/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ans:""})
            });
    
            if(res.ok) {
                const result = await res.json();
                expect(result.message)
                .to
                .equal("Success but empty answer");
            } else{
                console.error('Failed to get response from backend');
            }
              
        });
    
    
        it("make api call when answer is not empty", async ()=>{
        
            const res = await fetch('http://localhost:3080/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ans:"sum two number"})
            });
    
            if(res.ok) {
                const result = await res.json();
                expect(result.message)
                .to
                .equal("Success");
    
                expect(result.correctness)
                .to
                .be
                .a("boolean")
    
                expect(result.failedTests)
                .to
                .be
                .a("string")
    
                expect(result.generatedCode)
                .to
                .be
                .a("string")
    
            } else{
                console.error('Failed to get response from backend');
            }
              
        });
    
     
    
    
    })
});


