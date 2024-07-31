//example functions
const E_Q1 = `function TestFunction(a,b) {return a + b}`;
const E_Q2 = `function TestFunction(a,b) {return a - b}`;
const E_Q3 =  `function TestFunction(a,b) {return a * b}`;
const E_Q4 =  `function TestFunction(a,b) {return a / b}`;
const E_Q5 = `function TestFunction(n){
                return n%2 === 0;
            }`;
const E_Q6 = `function TestFunction(n){
                return n%2 === 1;
            }`;
const E_Q7 = `function TestFunction(str) {
                return str.length;
            }`;
const E_Q7_wrong = `function TestFunction(str) {
                    return str.length-1;
                  }`;
const E_Q8 = `function TestFunction(num) {
                return Math.pow(num, 2);
            }`;
const E_Q8_wrong = `function TestFunction(num) {
                return num*2;
            }`;

const M_Q2 = `function TestFunction(arr) {
                const sum = arr.reduce((a, b) => a + b, 0);
                return sum / arr.length || null
            }`;
const M_Q3 = `function TestFunction(arr) {return arr.length ? Math.max(...arr) : null}`;

const M_Q4 = `function TestFunction(str) {
    const words = str.split(' ');
    return Math.max(...words.map(word => word.length));
}`;

const M_Q5 = `function TestFunction(numberToFind, arrayOfNumbers) {
    
    let found = arrayOfNumbers.filter(num => num === numberToFind).length;

    if(found > 0) {
        return true;
    } else {
        return false;
    }
}`;

const M_Q5_wrong = `function TestFunction(key, array){
    if (array.length === 0) {
        return false;
    }
    
    return key === array[0];
}`;

const M_Q6 = `function TestFunction(arr) {
  return arr.filter(num => num % 2 !== 0).length;
}`;

const M_Q7 = `function TestFunction(arr) {
  return arr.reduce((count, num) => count + (num % 2 === 0 ? 1 : 0), 0);
}`;

const M_Q7_wrong = `function TestFunction(arr) {
    return arr.length;
}`;

const M_Q8 = `function TestFunction(arr) {
    let min = arr[0]; 

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) { 
            min = arr[i];
        }
    }

    return min;
}`;

const M_Q8_wrong = `function TestFunction(a){
                        if(a.length===0){
                            return null;
                        }
                        
                        return a[0];
                    }`;

const M_Q8_wrong_2 = `function TestFunction(a){
    if(a.length===0){
        return null;
    }
    
    return a[a.length-1];
}`;

const H_Q3 = `function TestFunction(n) {
    if (n < 10) return n;

    return (n % 10) + TestFunction(Math.floor(n/10));
}`;

const H_Q4 = `function TestFunction(n) {
    return n <= 1 ? 1 : n * TestFunction(n - 1);
}`;

const H_Q5 = `function TestFunction(n) {
    return n <= 1 ? n : TestFunction(n - 2) + TestFunction(n - 1);
}`;

const H_Q6 = `function TestFunction(str) {
    let cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let reversedStr = cleanedStr.split('').reverse().join('');
    return cleanedStr === reversedStr;
}`;

const H_Q6_wrong = `function TestFunction(str) {
    let cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let reversedStr = cleanedStr.reverse().join('');
    return cleanedStr === reversedStr;
}`;

const H_Q7 = `function TestFunction(n) {
                if (n === 0) return 0;
                return n + TestFunction(n - 1);
              }`;

const H_Q7_wrong = `function TestFunction(n){
    return n+1+2;
}`;

const H_Q8 = `function TestFunction(arr) {
    let count = 0; 
    let seen = new Set(); 

    for (let num of arr) { 
        if (!seen.has(num)) { 
            seen.add(num);
            count++;
        }
    }

    return count;
}`;

const H_Q8_wrong = `function TestFunction(arr) {
  return arr.reduce((count, num) => count + (num % 2 === 0 ? 1 : 0), 0);
}`;


//tests
describe("Test the test for generated code", ()=>{
    //Easy
    describe("Easy SandBox Tests Result", function() {
        
        it('E_Q1 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 1,
                    code: E_Q1,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('E_Q2 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 2,
                    code: E_Q2,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('E_Q3 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 3,
                    code: E_Q3,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('E_Q4 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 4,
                    code: E_Q4,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });
        


        it('E_Q5 correct', async() => {
            //make api call to the backend that assist with the test
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 5,
                    code: E_Q5,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }

        });

        it('E_Q5 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 5,
                    code: E_Q6,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        it('E_Q6 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 6,
                    code: E_Q6,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('E_Q6 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 6,
                    code: E_Q5,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        it('E_Q7 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 7,
                    code: E_Q7,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('E_Q7 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 7,
                    code: E_Q7_wrong,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        it('E_Q8 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 8,
                    code: E_Q8,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('E_Q8 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 8,
                    code: E_Q8_wrong,
                    diff:1
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        


    });

    //Moderate
    describe("Moderate SandBox Tests Result", function() {
        

        it('M_Q2 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 2,
                    code: M_Q2,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('M_Q3 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 3,
                    code: M_Q3,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('M_Q4 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 4,
                    code: M_Q4,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });
        


        it('M_Q5 correct', async() => {
            //make api call to the backend that assist with the test
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 5,
                    code: M_Q5,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }

        });

        it('M_Q5 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 5,
                    code: M_Q5_wrong,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        it('M_Q6 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 6,
                    code: M_Q6,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        

        it('M_Q7 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 7,
                    code: M_Q7,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('M_Q7 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 7,
                    code: M_Q7_wrong,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        it('M_Q8 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 8,
                    code: M_Q8,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('M_Q8 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 8,
                    code: M_Q8_wrong,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        it('M_Q8 icorrect 2', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 8,
                    code: M_Q8_wrong_2,
                    diff:2
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        


    });

    //Hard
    describe("Hard SandBox Tests Result", function() {
        
        

        it('H_Q3 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 3,
                    code: H_Q3,
                    diff:3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('H_Q4 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 4,
                    code: H_Q4,
                    diff:3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });
        


        it('H_Q5 correct', async() => {
            //make api call to the backend that assist with the test
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 5,
                    code: H_Q5,
                    diff:3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }

        });

        

        it('H_Q6 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 6,
                    code: H_Q6,
                    diff:3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('H_Q6 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 6,
                    code: H_Q6_wrong,
                    diff:3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        it('H_Q7 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 7,
                    code: H_Q7,
                    diff:3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('H_Q7 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 7,
                    code: H_Q7_wrong,
                    diff: 3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        it('H_Q8 correct', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 8,
                    code: H_Q8,
                    diff: 3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .include("passed");

            }
        });

        it('H_Q8 icorrect', async() => {
            const response = await fetch('http://localhost:3080/testResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num: 8,
                    code: H_Q8_wrong,
                    diff: 3
                })
            });
            
            if (response.ok) {

                let sandboxResult = await response.json();
                console.log(sandboxResult);
                expect(sandboxResult.testResult)
                .to
                .not
                .include("passed");

            }
        });

        


    });


});



