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
            return await testAvg(code);
        default:
            return "Invalid Question Number";
    }
}

async function mediumTestSelect(question_num, code) {
    switch(question_num) {
        case 0:
            return "All tests passed";
        case 1:
            return testFactorial(code);
        case 2: 
            return testReverseString(code);
        case 3:
            return isPalindrome(code);
        case 4:
            return testLongestString(code);
        case 5:
            return testDigitInSt(code);
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
            return "All tests passed";
        case 3:
            return testInsertionSort(code);
        case 4:
            return testSelectionSort(code);
        case 5:
            return testLongestPalindrome(code);
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
                if (result === 'null') result = null; 
                

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

function testGetLength(code) {
    const testCases = [
        {args: [["a"]], expected: 1},
        {args: [], expected: 0},
        {args: ["abc"], expected: 3}
    ]
    return runTests(code, testCases);
}

//empty array allowed?
//double or integer
function testAvg(code){
    const testCases =[
        {args: [[2, 4, 9]], expected: 5},
        {args: [[2]], expected: 2},
        {args: [[3, 4]], expected: 3}
    ]
    return runTests(code, testCases);
}

//Moderated
//Q2
function testFactorial(code){
    const testCases = [
        {args: [0], expected: 1},
        {args: [1], expected: 1},
        {args: [2], expected: 2},
        {args: [170], expected: 7.257415615307994e+306},
        {args: [171], expected: null}
    ]
    return runTests(code, testCases);
}

//Q3
function testReverseString(code){
    const testCases = [
        {args: [""], expected: null},
        {args: ["a"], expected: "a"},
        {args: ["abcd"], expected: "dcba"},
        {args: ["ab123"], expected: "321ba"}
    ]
    return runTests(code, testCases);
}

//Q4
function isPalindrome(code){
    const testCases = [
        {args: [""], expected: true},
        {args: [" "], expected: true},
        {args: ["Too hot to hoot"], expected: true},
        {args: ["Hello World"], expected: false}
    ]
    return runTests(code, testCases);
}

//Q5
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



//Q6
function testDigitInSt(code){
    const testCases =[
        {args: ["Tree"], expected: 0},
        {args: [""], expected: 0},
        {args: ["The is 1"], expected: 1},
        {args: ["123"], expected: 3}
    ]

    return runTests(code, testCases);

}

//Q7
function testNumberOfWords(code){
    const testCases =[
        {args: ["Tree"], expected: 1},
        {args: [""], expected: 0},
        {args: ["   "], expected: 0},
        {args: ["The is a test"], expected: 4},
        {args: [" I'm a test"], expected: 3}
    ]

    return runTests(code, testCases);
}

//Q8
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


//hard

//Q3
function testAnagram(code){
    const testCases = [
        {args: [[]], expected: true},
        {args: [["a", "b"]], expected: false},
        {args: [["cat", "act"]], expected: true},
        {args: [["cat", ""]], expected: false}
    ]
    return runTests(code, testCases);
}

//Q4

function testInsertionSort(code){
    const testCases =[
        {args: [[]], expected: []},
        {args: [[6, 5, 4]], expected: [4, 5, 6]},
        {args: [[1,2]], expected: [1,2]},
        {args: [[6, 3, 8]], expected: [3, 6, 8]},
    ]

    return runTests(code, testCases);
}


//Q5
function testSelectionSort(code){
    const testCases =[
        {args: [[]], expected: []},
        {args: [[6, 5, 4]], expected: [4, 5, 6]},
        {args: [[1,2]], expected: [1,2]},
        {args: [[6, 3, 8]], expected: [3, 6, 8]},
    ]

    return runTests(code, testCases);
}


//Q6
function testLongestPalindrome(code){
    const testCases =[
        {args: [[]], expected: 0},
        {args: [["ab", "abc"]], expected: 0},
        {args: [["aba"]], expected: 3},
        {args: [["ab", "abba", "abeba"]], expected: 5},
    ]

    return runTests(code, testCases);
}

//Q7
function testLongestCommonPrefix(code){
    const testCases = [
        {args: [[]], expected: null},
        {args: [["flower", "flow", "flight"]], expected: "fl"},
        {args: [["flower", "", ""]], expected: null},
        {args: [["flower", "flow", ""]], expected: null},
        {args: [["flower", "car", "dog"]], expected: null}
    ]
    return runTests(code, testCases);
}

//Q8
function testRemoveDuplicates(code){
    const testCases = [
        {args: [[]], expected: 0},
        {args: [1, 1], expected: 1},
        {args: [[1, 1, 1]], expected: 1},
        {args: [[1, 1, 1, 2]], expected: 2},
        {args: [[1, 1, 2, 2, 3, 4, 4, 5]], expected: 5},
        {args: [[1, 2, 3, 4, 5]], expected: 5}
    ]
    return runTests(code, testCases);
}