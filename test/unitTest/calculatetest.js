
const SAMPLE_QUIZ_1 = [
    {
        questionNum:1,
        question:"def foo(a,b): return a + b",
        answer:"add two integers",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:47:22 PM",
        difficultyLevel:"Easy",
        generatedCode:`function TestFunction(a, b) {return a + b;}`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:2,
        question:`def foo(n):
                    a = 0
                    c = len(n)
                    if c == 0:
                    return null`,
        answer:"return the average of all numbers in n",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:48:11 PM",
        difficultyLevel:"Moderate",
        generatedCode:`function TestFunction(n) {let sum = n.reduce((a, b) => a + b, 0);`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:3,
        question:`def foo(s1, s2):
                    def bar(a):
                        return ''.join(sorted(a.replace(r'[^\w]', '').lower()))

                    c1 = bar(s1)
                    c2 = bar(s2)
                    return c1 == c2`,
        answer:"return true if given strings are anagrams. If no inputs are given, return true",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:50:33 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(...strs) {
                            if (!strs.length) return true;
                            let obj = {};
                            for (let str of strs) {
                                for (let char of str.toLowerCase().split('')) {
                                    if (!obj[char]) obj[char] = 1;
                                    else obj[char]++;
                                }
                            }
                            for (let key in obj) {
                                if (obj[key] !== strs.length) return false;
                            }
                            return true;
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:4,
        question:`def foo(n):
                    if n == 0 or n == 1:
                        return 1
                    else:
                        return n * foo(n-1)`,
        answer:"return factorial of n",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:51:56 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(n) {
                            let result = 1;
                            for (let i = 2; i <= n; i++) {
                                result *= i;
                            }
                            return result;
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:5,
        question:`def foo(n, a=0, b=1):
                        if n == 0:
                            return a
                        else:
                            return foo(n - 1, b, a + b)`,
        answer:"return the nth Fibonacci number",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:52:49 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(n) {
                            if (n <= 1) return n;
                            let f = [0, 1];

                            for(let i = 2; i <= n; i++) {
                                f[i] = f[i - 1] + f[i - 2];
                            }

                            return f[n];
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:6,
        question:`def foo(s):
                    a = s.split("").reverse().join("");
                    if a == s: return true;
                    return false;`,
        answer:"return true if the given string is palindrome. it's case insensitive and ignore the white spaces",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:53:36 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(str) {
                        const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
                        return cleanStr === reverseString(cleanStr);
                        }

                        function reverseString(str) {
                        return str.split('').reverse().join('');
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:7,
        question:`def foo(a):
                    if len(a) == 0:
                        return 0
                    a.sort()
                    b = a[0]
                    c = a[-1]
                    d = 0

                    for i in range(min(len(b), len(c))):
                        if b[i] != c[i]:
                            return len(d)
                        d += b[i]

                    return len(d)`,
        answer:"return the length of the longest common prefix in a given array of strings",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:54:14 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(strArr) {
                            let minLen = Infinity, result = '';
                            if (!strArr.length) return 0;

                            for (let i = 0; i < strArr[0].length; i++) {
                                const char = strArr[0][i];
                                for (let j = 1; j < strArr.length; j++) {
                                if (strArr[j][i] !== char) return result.length;
                                }
                                minLen = Math.min(minLen, i + 1);
                                result += char;
                            }

                            return minLen;
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:8,
        question:`def foo(a):
                    if len(a) == 0:
                        return 0
                    b = 1

                    for i in range(1, len(a)):
                        if a[i] != a[i - 1]:
                            a[b] = a[i]
                            b += 1
                    return b`,
        answer:"return the number of distinct numbers in a given array. return 0 if the array is empty",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:55:00 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(arr) {
                            return arr.filter((v, i, self) => self.indexOf(v) === i).length;
                       }`,
        failedTestCases:"All tests passed"
    }
];

const SAMPLE_QUIZ_2 = [
    {
        questionNum:1,
        question:`function TestFunction(a,b) {return a + b}`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/26/2024, 4:15:35 PM",
        endTime: "7/26/2024, 4:15:49 PM",
        difficultyLevel:"Easy",
        generatedCode:"No generated code since you did not provide an answer",
        failedTestCases:"All tests failed since you did not provide an answer"
    },
    {
        questionNum:2,
        question:`function TestFunction(a,b) {return a - b}`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/26/2024, 4:15:35 PM",
        endTime: "7/26/2024, 4:15:49 PM",
        difficultyLevel:"Easy",
        generatedCode:"No generated code since you did not provide an answer",
        failedTestCases:"All tests failed since you did not provide an answer"
    },
    {
        questionNum:3,
        question:`function TestFunction(a,b) {return a * b}`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/26/2024, 4:15:35 PM",
        endTime: "7/26/2024, 4:15:49 PM",
        difficultyLevel:"Easy",
        generatedCode:"No generated code since you did not provide an answer",
        failedTestCases:"All tests failed since you did not provide an answer"
    },
    {
        questionNum:4, 
        question:`function TestFunction(a,b) {return a / b}`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/26/2024, 4:15:35 PM",
        endTime: "7/26/2024, 4:15:49 PM",
        difficultyLevel:"Easy",
        generatedCode:"No generated code since you did not provide an answer",
        failedTestCases:"All tests failed since you did not provide an answer"
    },
    {
        questionNum:5, 
        question:`function TestFunction(n)  {return n % 2 === 0;}`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/26/2024, 4:15:35 PM",
        endTime: "7/26/2024, 4:15:50 PM",
        difficultyLevel:"Easy",
        generatedCode:"No generated code since you did not provide an answer",
        failedTestCases:"All tests failed since you did not provide an answer"
    },
    {
        questionNum:6, 
        question:`function TestFunction(n)  {return n % 2 === 1;}`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/26/2024, 4:15:35 PM",
        endTime: "7/26/2024, 4:15:50 PM",
        difficultyLevel:"Easy",
        generatedCode:"No generated code since you did not provide an answer",
        failedTestCases:"All tests failed since you did not provide an answer"
    },
    {
        questionNum:7, 
        question:`function TestFunction(s)  {return s.length;}`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/26/2024, 4:15:35 PM",
        endTime: "7/26/2024, 4:15:50 PM",
        difficultyLevel:"Easy",
        generatedCode:"No generated code since you did not provide an answer",
        failedTestCases:"All tests failed since you did not provide an answer"
    },
    {
        questionNum:8, 
        question:`function TestFunction(n)  {return Math.pow(n, 2);}`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/26/2024, 4:15:35 PM",
        endTime: "7/26/2024, 4:15:50 PM",
        difficultyLevel:"Easy",
        generatedCode:"No generated code since you did not provide an answer",
        failedTestCases:"All tests failed since you did not provide an answer"
    },
];

const SAMPLE_QUIZ_3 =  [
    {
        questionNum:1,
        question:"def foo(a,b): return a + b",
        answer:"subtract two integers",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:47:22 PM",
        difficultyLevel:"Easy",
        generatedCode:`function TestFunction(a, b) {return a + b;}`,
        failedTestCases:"Test failed"
    },
    {
        questionNum:1,
        question:"def foo(a,b): return a + b",
        answer:"add two integers",
        reasonofchange:"",
        passfail:true,
        attemptNum:2,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:47:22 PM",
        difficultyLevel:"Easy",
        generatedCode:`function TestFunction(a, b) {return a + b;}`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:2,
        question:`def foo(n):
                    a = 0
                    c = len(n)
                    if c == 0:
                    return null`,
        answer:"return the average of all numbers in n",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:48:11 PM",
        difficultyLevel:"Moderate",
        generatedCode:`function TestFunction(n) {let sum = n.reduce((a, b) => a + b, 0);`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:3,
        question:`def foo(s1, s2):
                    def bar(a):
                        return ''.join(sorted(a.replace(r'[^\w]', '').lower()))

                    c1 = bar(s1)
                    c2 = bar(s2)
                    return c1 == c2`,
        answer:"return true if given strings are anagrams. If no inputs are given, return true",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:50:33 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(...strs) {
                            if (!strs.length) return true;
                            let obj = {};
                            for (let str of strs) {
                                for (let char of str.toLowerCase().split('')) {
                                    if (!obj[char]) obj[char] = 1;
                                    else obj[char]++;
                                }
                            }
                            for (let key in obj) {
                                if (obj[key] !== strs.length) return false;
                            }
                            return true;
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:4,
        question:`def foo(n):
                    if n == 0 or n == 1:
                        return 1
                    else:
                        return n * foo(n-1)`,
        answer:"return factorial of n",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:51:56 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(n) {
                            let result = 1;
                            for (let i = 2; i <= n; i++) {
                                result *= i;
                            }
                            return result;
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:5,
        question:`def foo(n, a=0, b=1):
                        if n == 0:
                            return a
                        else:
                            return foo(n - 1, b, a + b)`,
        answer:"return the nth Fibonacci number plus 1",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:52:49 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(n) {
                            if (n <= 1) return n;
                            let f = [0, 1];

                            for(let i = 2; i <= n; i++) {
                                f[i] = f[i - 1] + f[i - 2];
                            }

                            return f[n] + 1;
                        }`,
        failedTestCases:"Test failed"
    },
    {
        questionNum:5,
        question:`def foo(n, a=0, b=1):
                        if n == 0:
                            return a
                        else:
                            return foo(n - 1, b, a + b)`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:52:49 PM",
        difficultyLevel:"Hard",
        generatedCode:``,
        failedTestCases:""
    },
    {
        questionNum:6,
        question:`def foo(s):
                    a = s.split("").reverse().join("");
                    if a == s: return true;
                    return false;`,
        answer:"return true if the given string is palindrome. it's case insensitive and ignore the white spaces",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:53:36 PM",
        difficultyLevel:"Moderate",
        generatedCode:`function TestFunction(str) {
                        const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
                        return cleanStr === reverseString(cleanStr);
                        }

                        function reverseString(str) {
                        return str.split('').reverse().join('');
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:7,
        question:`def foo(a):
                    if len(a) == 0:
                        return 0
                    a.sort()
                    b = a[0]
                    c = a[-1]
                    d = 0

                    for i in range(min(len(b), len(c))):
                        if b[i] != c[i]:
                            return len(d)
                        d += b[i]

                    return len(d)`,
        answer:"return the length of the longest common prefix in a given array of strings",
        reasonofchange:"",
        passfail:true,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:54:14 PM",
        difficultyLevel:"Hard",
        generatedCode:`function TestFunction(strArr) {
                            let minLen = Infinity, result = '';
                            if (!strArr.length) return 0;

                            for (let i = 0; i < strArr[0].length; i++) {
                                const char = strArr[0][i];
                                for (let j = 1; j < strArr.length; j++) {
                                if (strArr[j][i] !== char) return result.length;
                                }
                                minLen = Math.min(minLen, i + 1);
                                result += char;
                            }

                            return minLen;
                        }`,
        failedTestCases:"All tests passed"
    },
    {
        questionNum:8,
        question:`def foo(a):
                    if len(a) == 0:
                        return 0
                    b = 1

                    for i in range(1, len(a)):
                        if a[i] != a[i - 1]:
                            a[b] = a[i]
                            b += 1
                    return b`,
        answer:"",
        reasonofchange:"",
        passfail:false,
        attemptNum:1,
        startTime:"7/19/2024, 2:47:16 PM",
        endTime:"7/19/2024, 2:54:14 PM",
        difficultyLevel:"Hard",
        generatedCode:``,
        failedTestCases:""
        
    }
];

const SAMPLE_LOQ_1 = [SAMPLE_QUIZ_1, SAMPLE_QUIZ_2, SAMPLE_QUIZ_3];
const SAMPLE_LOQ_2 = [SAMPLE_QUIZ_1];
const SAMPLE_LOQ_3 = [SAMPLE_QUIZ_2, SAMPLE_QUIZ_3];


const USER_1 = {
    _id: "668d7f9868fd5e29a6619760",
    userid: "user_2ikkp3PsG5NMWsTAvvx6YxuXDWV",
    results: SAMPLE_LOQ_1,
    username:"Llama1"
};

const USER_2 = {
    _id: "668ec98db871b48c0aba2358",
    userid: "user_2ilX1FlLIRoGvu1w4HkaYWu7CL3",
    results: SAMPLE_LOQ_2,
    username:"Llama2"
};

const USER_3 = {
    _id: "66a41853896245a8bbc63d89",
    userid: "user_2iRkLPhAxeb9pqeO29Zfe1QtbZr",
    results: SAMPLE_LOQ_3,
    username:"Llama2"
};

const USER_ARRAY_1 = [USER_1];
const USER_ARRAY_2 = [USER_1, USER_2];
const USER_ARRAY_3 = [USER_1, USER_2, USER_3]

describe("Calculation Helpers", ()=>{
    describe("calculate score", ()=>{
        it("calculate all correct", ()=>{
            let score = calculateScore(SAMPLE_QUIZ_1);
            expect(score)
            .to
            .equal(1);
        });
        
        it("calculate all incorrect", ()=>{
            let score = calculateScore(SAMPLE_QUIZ_2);
            expect(score)
            .to
            .equal(0);
        });
    
        it("calculate two are incorrect and success at different attempts", ()=>{
            let score = calculateScore(SAMPLE_QUIZ_3);
            expect(score)
            .to
            .equal(6/8);
        }); 
    
    });
    
    
    describe("calculate scaled score", ()=>{
        it("calculate all correct", ()=>{
            let score = calcultateScaledScore(SAMPLE_QUIZ_1);
            expect(score)
            .to
            .equal(1);
        });
        
        it("calculate all incorrect", ()=>{
            let score = calcultateScaledScore(SAMPLE_QUIZ_2);
            expect(score)
            .to
            .equal(0);
        });
    
        it("calculate two are incorrect", ()=>{
            let score = calcultateScaledScore(SAMPLE_QUIZ_3);
            expect(score)
            .to
            .equal(5.2/7.4);
            
        }); 
    
    });
    
    describe("calculate average score of a list of quizzes", ()=>{
        it("1 quiz", ()=>{
            let avgScore = calculateAvgScore(SAMPLE_LOQ_2);
            expect(avgScore)
            .to
            .equal(100);
        });
        
        it("2 quizzes", ()=>{
            let avgScore = calculateAvgScore(SAMPLE_LOQ_3);
            expect(avgScore)
            .to
            .equal(100*((0 + (6/8))/2));
          
        });
    
        it("3 quizzes", ()=>{
            let avgScore = calculateAvgScore(SAMPLE_LOQ_1);
            expect(avgScore)
            .to
            .equal(100*((0 + (6/8) + 1)/3));
            
        }); 
    
    });
    
    
    describe("calculate average scaled score of a list of quizzes", ()=>{
        it("1 quiz", ()=>{
            let avgScore = calculateAvgScaledScore(SAMPLE_LOQ_2);
            expect(avgScore)
            .to
            .equal(100);
        });
        
        it("2 quizzes", ()=>{
            let avgScore = calculateAvgScaledScore(SAMPLE_LOQ_3);
            expect(avgScore)
            .to
            .equal(100*((0 + (5.2/7.4))/2));
          
        });
    
        it("3 quizzes", ()=>{
            let avgScore = calculateAvgScaledScore(SAMPLE_LOQ_1);
            expect(avgScore)
            .to
            .equal(100*((0 + (5.2/7.4) + 1)/3));
            
        }); 
    
    });

    describe("calculate average score of all users", ()=>{
        it("1 user", ()=>{
            let avgScoreforAll = calculateAllAvg(USER_ARRAY_1);
            expect(avgScoreforAll)
            .to
            .equal(100*((0 + (6/8) + 1)/3));
        });

        it("2 users", ()=>{
            let avgScoreforAll = calculateAllAvg(USER_ARRAY_2);
            expect(avgScoreforAll)
            .to
            .equal((100 + 100*((0 + (6/8) + 1)/3))/2);
            
        });

        it("3 users", ()=>{
            let avgScoreforAll = calculateAllAvg(USER_ARRAY_3);
            expect(avgScoreforAll)
            .to
            .equal((100 + 100*((0 + (6/8) + 1)/3) + 100*(((6/8) + 0)/2))/3);
            
        });
        
    });

    describe("calculate scaled average score of all users", ()=>{
        it("1 user", ()=>{
            let avgScaledScoreforAll = calculateAllScaledAvg(USER_ARRAY_1);
            expect(avgScaledScoreforAll)
            .to
            .equal(100*((0 + (5.2/7.4) + 1)/3));
        });

        it("2 users", ()=>{
            let avgScaledScoreforAll = calculateAllScaledAvg(USER_ARRAY_2);
            expect(avgScaledScoreforAll)
            .to
            .equal((100*((0 + (5.2/7.4) + 1)/3) + 100)/2);
        });

        it("3 users", ()=>{
            let avgScaledScoreforAll = calculateAllScaledAvg(USER_ARRAY_3);
            expect(avgScaledScoreforAll)
            .to
            .equal((100*((0 + (5.2/7.4) + 1)/3) + 100 + 100*(((5.2/7.4) + 0)/2))/3);
        });
        
      
    });

});

