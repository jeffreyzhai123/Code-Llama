import Sandbox from "sandbox";
const s = new Sandbox();

//selects the right test set for the right question
export async function testSelector(question_num, code) {
    //so switch case can start a case 0
    question_num--;

    switch(question_num) {
        case 0:
            return await test0(code);
        case 1:
            return await test1(code);
        case 2: 
            return await test2(code);
        case 3:
            return await test3(code);
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
                const result = output.result;
                //updates results arr 
                results.push({ args: testArgs, result, expected });
  
                //check if all tests have been executed
                if (results.length == testCases.length) {
                    //creates new array with just failed tests (to be returned)
                    const failedTests = results.filter((test) => test.result != test.expected);
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
/* 
function test0(code) {
    const testCases = [
      { args: [2, 3], expected: 5 },
      { args: [3, 3], expected: 6 },
    ];
    return runTests(code, testCases);
} 
*/