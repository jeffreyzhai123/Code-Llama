import Sandbox from "sandbox";
const s = new Sandbox();

//selects the right test set for the right question
export async function testSelector(question_num, code) {
    //so switch case can start a case 0
    question_num--;

    switch(question_num) {
        case 0:
            return await testAdd(code);
        case 1:
            return await testSub(code);
        case 2: 
            return await testMult(code);
        case 3:
            return await testDiv(code);
        case 4:
            return await testEven(code);
        case 5:
            return await testOdd(code);
        default:
            return "Invalid Question Number";
    }
}

//runs the generated code against our array of testCases 
function runTests(code, testCases) {
    return new Promise((resolve) => {
        const results = []; // Array to store the results of each test
  
        //for loop to run each test case with the arguments and function properly formatted 
        testCases.forEach(({ args, expected }) => {
            const testArgs = args.join(', '); //converts array of args [2, 3] into comma-separated string 2, 3
            const testName = `TestFunction(${testArgs})`; //creates the string TestFunction(testArgs)
        
            //call async function s.run to run code in sandboxed env
            //uses output object passed in by s.run to store result of the tests
            s.run(`${code} ${testName}`, (output) => {
                let result = output.result;
                //updates results arr 

                // Debugging statements
                console.log('Result:', result, 'Type:', typeof result);
                console.log('Expected:', expected, 'Type:', typeof expected);

                //normalizing result because LLM is dumb (maybe we remove this have force user to specify return type)
                if (result === 'true') result = true;
                if (result === 'false') result = false;

                results.push({ args: testArgs, result, expected });
  
                //check if all tests have been executed
                if (results.length == testCases.length) {
                    //creates new array with just failed tests (to be returned)
                    const failedTests = results.filter((test) => JSON.stringify(test.result) !== JSON.stringify(test.expected));
                    //if no tests failed return all tests passed and resolve the promise
                    if (failedTests.length == 0) {
                        resolve("All tests passed");
                    } else {
                        //prints all failed tests by adding it to a new array and then printing each element on a new line using .join
                        const failureMessages = failedTests.map((test) => {
                        return `Test failed: expected ${test.expected}, got ${test.result} for args: ${test.args}`;
                    });
                        //.join used to concat all elements in array into a single string with <br> between each element
                        //because this is going to be displayed on the frontend as html elements
                        //need to use <br> to signal line breaks rather than /n
                        resolve(failureMessages.join('<br>'));
                    }
                }
            });
        });
    });
}

//example

function testAdd(code) {
    const testCases = [
      { args: [2, 3], expected: 5 },
      { args: [3, 3], expected: 6 },
    ];
    return runTests(code, testCases);
} 

function testSub(code) {
    const testCases = [
      { args: [2, 3], expected: -1 },
      { args: [3, 3], expected: 0 },
    ];
    return runTests(code, testCases);
  }
  
function testMult(code) {
    const testCases = [
      { args: [3, 3], expected: 9 },
      { args: [2, 4], expected: 8 },
    ];
    return runTests(code, testCases);
  }
  
function testDiv(code) {
    const testCases = [
      { args: [6, 3], expected: 2 },
      { args: [20, 5], expected: 4 },
    ];
    return runTests(code, testCases);
  }

function testEven(code) {
    const testCases = [
        { args: [4], expected: true },
        { args: [7], expected: false }
    ];
    return runTests(code, testCases);
}

function testOdd(code) {
    const testCases = [
        { args: [4], expected: false },
        { args: [7], expected: true }
    ];
    return runTests(code, testCases);
}

