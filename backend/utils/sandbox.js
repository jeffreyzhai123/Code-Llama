import Sandbox from "sandbox";
const s = new Sandbox();

//selects the right test set for the right question
export async function testSelector(question_num, code, diff) {
    //so switch case can start a case 0
    question_num--;
    console.log(diff);

    if (diff == 1) {
        console.log("easy test");
        return easyTestSelect(question_num, code);
    } else if (diff == 2) {
        console.log("medium test");
        return mediumTestSelect(question_num, code);
    } else {
        console.log("hard test");
        return hardTestSelect(question_num, code);
    }
}

async function easyTestSelect(question_num, code) {
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
        case 6:
            return await testGetLength(code);
        case 7:
            return await testSquare(code);
        default:
            return "Invalid Question Number";
    }
}

async function mediumTestSelect(question_num, code) {
    switch(question_num) {
        case 0:
            return "All tests passed";
        case 1:
            return testAvg(code);
        case 2: 
            return testFindMax(code);
        case 3:
            return testLongestString(code);
        case 4:
            return testFindKey(code);
        case 5:
            return testCountOdd(code);
        case 6: 
            return testCountEven(code);
        case 7:
            return testFindMin(code);
        default:
            return "Invalid Question Number";
    }
}

async function hardTestSelect(question_num, code) {
    switch(question_num) {
        case 0:
            return "All tests passed";
        case 1:
            return "All tests passed";
        case 2: 
            return testSumDigits(code);
        case 3:
            return testFactorial(code);
        case 4:
            return testFibonacciNum(code);
        case 5:
            return testIsPalindrome(code);
        case 6: 
            return testSumFromN(code);
        case 7:
            return testDistinctNum(code);
        default:
            return "Invalid Question Number";
    }
}

//runs the generated code against our array of testCases 
export function runTests(code, testCases) {
    return new Promise((resolve) => {
        const results = []; // Array to store the results of each test
        let testCaseNum = 1;
  
        //for loop to run each test case with the arguments and function properly formatted 
        testCases.forEach(({ args, expected }) => {
            const formattedArgs = args.map(arg => JSON.stringify(arg));
            const functionCall = `TestFunction(${formattedArgs.join(', ')})`; //creates the string TestFunction(testArgs)
        
            //call async function s.run to run code in sandboxed env
            //uses output object passed in by s.run to store result of the tests
            s.run(`${code} ${functionCall}`, (output) => {
                let result = output.result;
                //updates results arr 

                // Debugging statements
                console.log('Result:', result, 'Type:', typeof result);
                console.log('Expected:', expected, 'Type:', typeof expected);

                //normalizing result because LLM is dumb (maybe we remove this have force user to specify return type)
                if (result === 'true') result = true;
                if (result === 'false') result = false;
                if (result === 'null') result = null; 
                if (typeof expected === 'string') expected = JSON.stringify(expected);
                if (typeof expected === 'number') result = Number(result);
              
                

                results.push({ args: formattedArgs, result, expected, num:testCaseNum});
                testCaseNum++;
  
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
                        return `Test Case ${test.num} failed: expected ${test.expected}, got ${test.result} for args: ${test.args}`;
                    });
                        //.join used to concat all elements in array into a single string with <br> between each element
                        //join with \n and display inside a <pre> in html to separate them in lines
                        resolve(failureMessages.join('\n'));
                    }
                }
            });
        });
    });
}

//Easy
//Q1
function testAdd(code) {
    const testCases = [
      { args: [2, 3], expected: 5 },
      { args: [3, 3], expected: 6 },
    ];
    return runTests(code, testCases);
} 

//Q2
function testSub(code) {
    const testCases = [
      { args: [2, 3], expected: -1 },
      { args: [3, 3], expected: 0 },
    ];
    return runTests(code, testCases);
}
  
//Q3 
function testMult(code) {
    const testCases = [
      { args: [3, 3], expected: 9 },
      { args: [2, 4], expected: 8 },
    ];
    return runTests(code, testCases);
}

//Q4
function testDiv(code) {
    const testCases = [
      { args: [6, 3], expected: 2 },
      { args: [20, 5], expected: 4 },
    ];
    return runTests(code, testCases);
}
//Q5
function testEven(code) {
    const testCases = [
        { args: [4], expected: true },
        { args: [7], expected: false }
    ];
    return runTests(code, testCases);
}

//Q6
function testOdd(code) {
    const testCases = [
        { args: [4], expected: false },
        { args: [7], expected: true }
    ];
    return runTests(code, testCases);
}

//Q7
function testGetLength(code) {
    const testCases = [
        {args: ["a"], expected: 1},
        {args: [""], expected: 0},
        {args: ["abc"], expected: 3}
    ];
    return runTests(code, testCases);
}

//Q8
function testSquare(code) {
    const testCases = [
        {args: [1], expected: 1},
        {args: [0], expected: 0},
        {args: [4], expected: 16}
    ]
    return runTests(code, testCases);
}


//Moderated

//Q2
//empty array not allowed
function testAvg(code){
    const testCases = [
        {args: [[2, 4, 9]], expected: 5},
        {args: [[2]], expected: 2},
        {args: [[-3, -4]], expected: -3.5},
        {args: [[0.5, 0.5, 0]], expected: 1/3},
        {args: [[]], expected: null}
    ]
    return runTests(code, testCases);
}


//Q3
function testFindMax(code) {
    const testCases = [
        {args: [[-9, -4, -2]], expected: -2},
        {args: [[2]], expected: 2},
        {args: [[4, 7, 2]], expected: 7},
        {args: [[]], expected: null}
    ]
    return runTests(code, testCases);

}

//Q4
function testLongestString(code){
    const testCases =[
        {args: ["Tree"], expected: 4},
        {args: [""], expected: 0},
        {args: ["   "], expected: 0},
        {args: ["The is a testttt"], expected: 7},
        {args: ["such a beautiful weather!"], expected: 9}
    ]

    return runTests(code, testCases);
}



//Q5
function testFindKey(code){
    const testCases = [
        {args: [2, [2, 4, 9]], expected: true},
        {args: [3, [2, 4, 9]], expected: false},
        {args: [9, [2, 4, 9]], expected: true},
        {args: [4, [2, 4, 9]], expected: true},
        {args: [4, []], expected: false},
    ]

    return runTests(code, testCases);
}

//Q6
function testCountOdd(code){
    const testCases = [
        {args: [[0, 1, 9]], expected: 2},
        {args: [[]], expected: 0},
        {args: [[2, 1, 4, 8]], expected: 1}
    ]
    return runTests(code, testCases);
}


//Q7
function testCountEven(code){
    const testCases =[
        {args: [[0, 1, 9]], expected: 1},
        {args: [[]], expected: 0},
        {args: [[2, 1, 4, 8]], expected: 3}
    ]

    return runTests(code, testCases);
}


//Q8
function testFindMin(code) {
    const testCases = [
        {args: [[-9, -4, -2]], expected: -9},
        {args: [[2]], expected: 2},
        {args: [[4, 7, 2]], expected: 2},
        {args: [[12, 7, 11]], expected: 7},
        {args: [[]], expected: null}
    ]
    return runTests(code, testCases);
}


//hard

//Q3
function testSumDigits(code){
    const testCases = [
        
        {args: [0], expected: 0},
        {args: [12], expected: 3},
        {args: [123], expected: 6}
    ]
    return runTests(code, testCases);
}

//Q4
function testFactorial(code){
    const testCases = [
        {args: [0], expected: 1},
        {args: [1], expected: 1},
        {args: [2], expected: 2},
        {args: [10], expected: 3628800}
    ]
    return runTests(code, testCases);
}



//Q5
function testFibonacciNum(code){
    const testCases =[
        {args: [0], expected: 0},
        {args: [1], expected: 1},
        {args: [2], expected: 1},
        {args: [3], expected: 2},
        {args: [10], expected: 55}
    ]

    return runTests(code, testCases);
}

//Q6
function testIsPalindrome(code){
    const testCases = [
        {args: [""], expected: true},
        {args: [" "], expected: true},
        {args: ["too hot to hoot"], expected: true},
        {args: ["Hello World"], expected: false}
    ]
    return runTests(code, testCases);
}

//Q7
function testSumFromN(code){
    const testCases = [
        {args: [0], expected: 0},
        {args: [1], expected: 1},
        {args: [2], expected: 3},
        {args: [10], expected: 55},
    ]
    return runTests(code, testCases);
}

//Q8
function testDistinctNum(code){
    const testCases = [
        {args: [[]], expected: 0},
        {args: [[1, 1]], expected: 1},
        {args: [[1, 1, 1]], expected: 1},
        {args: [[1, 1, 1, 2]], expected: 2},
        {args: [[1, 1, 2, 2, 3, 4, 4, 5]], expected: 5},
        {args: [[1, 2, 3, 4, 5]], expected: 5}
    ]
    return runTests(code, testCases);
}