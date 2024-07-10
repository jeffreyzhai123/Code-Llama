describe('Extractor', () => {
    const nomessage = "";
    const hasjavascriptandhasbacktick = "JavaScript function: \`javascript function TestFunction(a) returns a\`";
    const nojavascriptandhasbacktick = "JavaScript function: \` function TestFunction(a) returns a\`";
    const nojavascriptandnobacktick = "JavaScript function: function TestFunction(a) returns a";
    const hasjavascriptandnobacktick = "JavaScript function: javascript function TestFunction(a) returns a";

    const sumtwoint = `Here is a JavaScript function named \`TestFunction\` that sums two integers: 
                            \`\`\`javascript
                                function TestFunction(a, b) {
                                    if (typeof a !== 'number' || typeof b !== 'number') {
                                        throw new Error('Both inputs must be numbers.');
                                    }

                                    return a + b;
                                }
                            \`\`\`

                        You can use this function like so:

                            \`\`\`javascript
                                const sum = TestFunction(3, 5);
                                console.log(sum); // Output: 8
                            \`\`\`

                        This function checks if both inputs are numbers and returns their sum. If 
                        either input is not a number, it throws an error to indicate incorrect 
                        usage.`;

    describe("test the extract function", () => {
        
        it('nomessage should return empty string', () => {
            expect(extract(nomessage)).to.equal("");
        });

        it('has javascript and backtick - should return the correct TestFrunction', () => {
            expect(extract(hasjavascriptandhasbacktick)).to.equal(" function TestFunction(a) returns a");
        });

        it('does not have javascript but has backtick - should not return the correct TestFunction', () => {
            expect(extract(nojavascriptandhasbacktick)).to.not.include(" function TestFunction(a) returns a");
            expect(extract(nojavascriptandhasbacktick)).to.equal("t function: ");
        });

        it('does not have javascript nor backtick - should not return the correct TestFunction', () => {
            expect(extract(nojavascriptandnobacktick)).to.not.include(" function TestFunction(a) returns a");
            expect(extract(nojavascriptandnobacktick)).to.equal("JavaScrip");
        })

        it('has javascript but no backtick - should not return the correct TestFunction', () => {
            expect(extract(hasjavascriptandnobacktick)).to.not.include(" function TestFunction(a) returns a");
            expect(extract(hasjavascriptandnobacktick)).to.equal("JavaScript function: javascript");
        })

        it('sumtwoint should return the TestFunction that sums two integers', () => {
            expect(extract(sumtwoint)).to.include(`function TestFunction(a, b) {
                                    if (typeof a !== 'number' || typeof b !== 'number') {
                                        throw new Error('Both inputs must be numbers.');
                                    }

                                    return a + b;
                                }`);
        });
    });
});


