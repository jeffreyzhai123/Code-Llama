const QUIZ_RESULT_SAMPLE = [
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

const QUIZ_RESULT_SAMPLE_2 = [
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

const USER_ID = "user_2iRkLPhAxeb9pqeO29Zfe1QtbZr";
const USER_ID_NO_EXIST = "user_4iRkLPhAxeb9pqeO29Zfe1QtbZ11";

const NEW_USER = {
    userid: "user_test",
    username: "llama-x",
    quizResult: QUIZ_RESULT_SAMPLE
};

describe("Test Get, Post, Patch to Database", async function() {
    it('get user id successful', async() => {

        const response = await fetch(`http://localhost:3080/results/${USER_ID}`);
        if (response.ok) {
            expect(response.status)
            .to
            .equal(200);

            let data = await response.json();
            let resultUserId = data.userid;

            expect(resultUserId)
            .to
            .equal(USER_ID);
        } else {
            throw new Error('Failed to fetch userid');
        }
    });

    it('get user id unsuccessful', async() => {
        
        const response = await fetch(`http://localhost:3080/results/${USER_ID_NO_EXIST}`);
        if (response.ok) {
            expect(response.status)
            .to
            .equal(404);

            let data = await response.json();
            expect(data.errormsg)
            .to
            .equal("Not found");
        } 
    });

    it('test adding a new user in the database', async()=>{
       
        const response = await fetch('http://localhost:3080/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_USER)
        });

        if (response.ok) {
            const response2 = await fetch(`http://localhost:3080/results/${NEW_USER.userid}`);
            if (response2.ok) {
                let newUserInDb = await response2.json();
                expect(newUserInDb.userid)
                .to
                .equal(NEW_USER.userid)

                expect(newUserInDb.username)
                .to
                .equal(NEW_USER.username)

                expect(newUserInDb.results.length)
                .to
                .equal(1);

                expect(newUserInDb.results[0])
                .deep
                .to
                .equal(NEW_USER.quizResult)
      
            }
            //clean up the test user in the database
            const responseDelete = await fetch(`http://localhost:3080/results/${NEW_USER.userid}`, {
                method: 'DELETE'
            });
            
            if(responseDelete.ok){
                const deletedata= await responseDelete.json();
                console.log(deletedata);
            }
        }
        

    });

    it('test adding a new result to existing user in the database', async()=>{
        const response_newuser = await fetch('http://localhost:3080/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_USER)
        });

        if(response_newuser.ok){
            const response = await fetch(`http://localhost:3080/results/${NEW_USER.userid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quizResult: QUIZ_RESULT_SAMPLE_2,
                }),
            });
    
            if (response.ok) {
                const response2 = await fetch(`http://localhost:3080/results/${NEW_USER.userid}`);
                if (response2.ok) {
                    let newUserInDb = await response2.json();
                    expect(newUserInDb.results.length)
                    .to
                    .equal(2);
    
                    expect(newUserInDb.results[0])
                    .deep
                    .to
                    .equal(NEW_USER.quizResult);
    
                    expect(newUserInDb.results[1])
                    .deep
                    .to
                    .equal(QUIZ_RESULT_SAMPLE_2);
    
                    //clean up the test user in the database
                    const responseDelete = await fetch(`http://localhost:3080/results/user_test`, {
                        method: 'DELETE'
                    });
                    
                    if(responseDelete.ok){
                        const deletedata= await responseDelete.json();
                        console.log(deletedata);
                    }
          
                }
                
            }

        }
        

        
            
    });
    

    it('test changing the username for a user', async()=>{
        const response_newuser = await fetch('http://localhost:3080/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NEW_USER)
        });
        
        if(response_newuser.ok){
            const response = await fetch(`http://localhost:3080/profile/${NEW_USER.userid}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: "Llama-y",
                }),
            });

            if (response.ok) {
                const response2 = await fetch(`http://localhost:3080/results/${NEW_USER.userid}`);
                if (response2.ok) {
                    let testUserInDb = await response2.json();
                    //user id is not changed
                    expect(testUserInDb.userid)
                    .to
                    .equal(NEW_USER.userid)
    
                    //user name is changed correctly
                    expect(testUserInDb.username)
                    .to
                    .equal("Llama-y")
    
                    //results are not changed
                    expect(testUserInDb.results[0])
                    .deep
                    .to
                    .equal(NEW_USER.quizResult);
    
                    expect(testUserInDb.results.length)
                    .to
                    .equal(1);
    
    
                    //clean up the test user in the database
                    const responseDelete = await fetch(`http://localhost:3080/results/${NEW_USER.userid}`, {
                        method: 'DELETE'
                    });
                    
                    if(responseDelete.ok){
                        const deletedata= await responseDelete.json();
                        console.log(deletedata);
                    }
                }
            } 
    
        }
       
       

        
            
    });


});


