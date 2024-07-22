import { testSelector } from '../sandbox.js';
import { runTests } from '../sandbox.js';


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

const H_Q3 = `function TestFunction(str1, str2) {
    const sortedChars1 = [...new Set(str1.toLowerCase().split(''))].sort();
    const sortedChars2 = [...new Set(str2.toLowerCase().split(''))].sort();

    return sortedChars1.every((char, i) => char === sortedChars2[i]);
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

const H_Q7 = `function TestFunction(arr) {
  let len = arr.length;
  if (!len) return 0;

  for (let i = 0; i < arr[0].length; i++) {
    const char = arr[0][i];
    for (let j = 1; j < len; j++) {
      if (arr[j][i] !== char) return i;
    }
  }

  return arr[0].length; 
}`;

const H_Q7_wrong = `function TestFunction(arr){
    if(arr.length ===0) {
        return 0;
    }
    
    return arr[0].length;
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

describe("test E_Q5", function() {
    it('E_Q5 correct', async() => {
        const test_result = await testSelector(5, E_Q5, 1);
        expect(test_result)
        .to
        .include("passed");
    });

    it('E_Q5 icorrect', async() => {
        const test_result = await testSelector(5, E_Q6, 1);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});

describe("test E_Q6", function() {
    it('E_Q6 correct', async() => {
        const test_result = await testSelector(6, E_Q6, 1);
        expect(test_result)
        .to
        .include("passed");
    });

    it('E_Q6 icorrect', async() => {
        const test_result = await testSelector(6, E_Q5, 1);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});

describe("test E_Q7", function() {
    it('E_Q7 correct', async() => {
        const test_result = await testSelector(7, E_Q7, 1);
        expect(test_result)
        .to
        .include("passed");
    });

    it('E_Q7 icorrect', async() => {
        const test_result = await testSelector(7, E_Q7_wrong, 1);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});

describe("test E_Q8", function() {
    it('E_Q8 correct', async() => {
        const test_result = await testSelector(8, E_Q8, 1);
        expect(test_result)
        .to
        .include("passed");
    });

    it('E_Q8 icorrect', async() => {
        const test_result = await testSelector(8, E_Q8_wrong, 1);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});




describe("test M_Q5", function() {
    it('M_Q6 correct', async() => {
        const test_result = await testSelector(5, M_Q5, 2);
        expect(test_result)
        .to
        .include("passed");
    });

    it('M_Q6 icorrect', async() => {
        const test_result = await testSelector(5, M_Q5_wrong, 2);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});

describe("test M_Q7", function() {
    it('M_Q7 correct', async() => {
        const test_result = await testSelector(7, M_Q7, 2);
        expect(test_result)
        .to
        .include("passed");
    });

    it('M_Q7 icorrect', async() => {
        const test_result = await testSelector(7, M_Q7_wrong, 2);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});

describe("test M_Q8", function() {
    it('M_Q8 correct', async() => {
        const test_result = await testSelector(8, M_Q8, 2);
        expect(test_result)
        .to
        .include("passed");
    });

    it('M_Q8 icorrect', async() => {
        const test_result = await testSelector(8, M_Q8_wrong, 2);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });

    it('M_Q8 icorrect case 2', async() => {
        const test_result = await testSelector(8, M_Q8_wrong_2, 2);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});



describe("test H_Q6", function() {
    it('H_Q6 correct', async() => {
        const test_result = await testSelector(6, H_Q6, 3);
        expect(test_result)
        .to
        .include("passed");
    });

    it('H_Q6 icorrect', async() => {
        const test_result = await testSelector(6, H_Q6_wrong, 3);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});

describe("test H_Q7", function() {
    it('H_Q7 correct', async() => {
        const test_result = await testSelector(7, H_Q7, 3);
        expect(test_result)
        .to
        .include("passed");
    });

    it('H_Q7 icorrect', async() => {
        const test_result = await testSelector(7, H_Q7_wrong, 3);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});

describe("test H_Q8", function() {
    it('H_Q8 correct', async() => {
        const test_result = await testSelector(8, H_Q8, 3);
        expect(test_result)
        .to
        .include("passed");
    });

    it('H_Q8 icorrect', async() => {
        const test_result = await testSelector(8, H_Q8_wrong, 3);
        expect(test_result)
        .to
        .not
        .include("passed"); 
    });
});



describe("runTests", () => {
    it('testAdd should return the sum of two integers', () => {
        const E_T11 = [{ args: [2, 3], expected: 5}];
        const E_T12 = [{ args: [3, 3], expected: 6}];

        runTests(E_Q1, E_T11).then(result => {
            const expected = E_T11[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(E_Q1, E_T12).then(result => {
            const expected = E_T12[0].expected;
            expect(result).to.equal(expected);
        })
    });

    it('testSub should return the difference of two integers', () => {
        const E_T21 = [{ args: [2, 3], expected: -1 }];
        const E_T22 = [{ args: [3, 3], expected: 0 }];

        runTests(E_Q2, E_T21).then(result => {
            const expected = E_T21[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(E_Q2, E_T22).then(result => {
            const expected = E_T22[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testMult should return the multiplied number of two integers', () => {
        const E_T31 = [{ args: [3, 3], expected: 9 }];
        const E_T32 = [{ args: [2, 4], expected: 8 }];

        runTests(E_Q3, E_T31).then(result => {
            const expected = E_T31[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(E_Q3, E_T32).then(result => {
            const expected = E_T32[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testDiv should return the division of two integers', () => {
        const E_T41 = [{ args: [6, 3], expected: 2 }];
        const E_T42 = [{ args: [20, 5], expected: 4 }];

        runTests(E_Q4, E_T41).then(result => {
            const expected = E_T41[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(E_Q4, E_T42).then(result => {
            const expected = E_T42[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testAvg should return the average of the numbers in the given array or return null if the array is empty', () => {
        const M_T21 = [{ args: [[2, 4, 9]], expected: 5 }];
        const M_T22 = [{ args: [[2]], expected: 2 }];
        const M_T23 = [{ args: [[-3, -4]], expected: -3.5 }];
        const M_T24 = [{ args: [[0.5, 0.5, 0]], expected: 1/3 }];
        const M_T25 = [{ args: [[]], expected: null}];

        runTests(M_Q2, M_T21).then(result => {
            const expected = M_T21[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q2, M_T22).then(result => {
            const expected = M_T22[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q2, M_T23).then(result => {
            const expected = M_T23[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q2, M_T24).then(result => {
            const expected = M_T24[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q2, M_T25).then(result => {
            const expected = M_T25[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testFindMax should return the maximum in the given array or return null if the array is empty', () => {
        const M_T31 = [{ args: [[-9, -4, -2]], expected: -2 }];
        const M_T32 = [{ args: [[2]], expected: 2}];
        const M_T33 = [{ args: [[4, 7, 2]], expected: 7 }];
        const M_T34 = [{ args: [[]], expected: null}];

        runTests(M_Q3, M_T31).then(result => {
            const expected = M_T31[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q3, M_T32).then(result => {
            const expected = M_T32[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q3, M_T33).then(result => {
            const expected = M_T33[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q3, M_T34).then(result => {
            const expected = M_T34[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testLongestString should return the length of the longest word in the given string of words or return 0 if the string is empty', () => {
        const M_T41 = [{ args: ["Tree"], expected: 4 }];
        const M_T42 = [{ args: [""], expected: 0 }];
        const M_T43 = [{ args: ["   "], expected: 0 }];
        const M_T44 = [{ args: ["The is a testttt"], expected: 7}];
        const M_T45 = [{ args: ["such a beautiful weather!"], expected: 9 }];

        runTests(M_Q4, M_T41).then(result => {
            const expected = M_T41[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q4, M_T42).then(result => {
            const expected = M_T42[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q4, M_T43).then(result => {
            const expected = M_T43[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q4, M_T44).then(result => {
            const expected = M_T44[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q4, M_T45).then(result => {
            const expected = M_T45[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testCountOdd should return number of odd numbers in a given array or return 0 if the array is empty', () => {
        const M_T61 = [{ args: [[0, 1, 9]], expected: 2 }];
        const M_T62 = [{ args: [[]], expected: 0 }];
        const M_T63 = [{ args: [[2, 1, 4, 8]], expected: 1 }];


        runTests(M_Q6, M_T61).then(result => {
            const expected = M_T61[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q6, M_T62).then(result => {
            const expected = M_T62[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q6, M_T63).then(result => {
            const expected = M_T63[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testAnagram should check two given strings and return true if they are anagrams, or false if not. Return true if the array is empty', () => {
        const H_T31 = [{ args: [[]], expected: true }];
        const H_T32 = [{ args: [["a", "b"]], expected: false }];
        const H_T33 = [{ args: [["cat", "act"]], expected: true }];
        const H_T34 = [{ args: [["cat", ""]], expected: false }];

        runTests(H_Q3, H_T31).then(result => {
            const expected = H_T31[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q3, H_T32).then(result => {
            const expected = H_T32[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q3, H_T33).then(result => {
            const expected = H_T33[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q3, H_T34).then(result => {
            const expected = H_T34[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testFactorial should return the factorial of the given number', () => {
        const H_T41 = [{ args: [0], expected: 1 }];
        const H_T42 = [{ args: [1], expected: 1}];
        const H_T43 = [{ args: [2], expected: 2 }];
        const H_T44 = [{ args: [10], expected: 3628800 }];

        runTests(H_Q4, H_T41).then(result => {
            const expected = H_T41[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q4, H_T42).then(result => {
            const expected = H_T42[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q4, H_T43).then(result => {
            const expected = H_T43[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q4, H_T44).then(result => {
            const expected = H_T44[0].expected;
            expect(result).to.equal(expected);
        })
    })

    it('testFibonacciNum should return the nth fibonacci number', () => {
        const H_T51 = [{ args: [0], expected: 0 }];
        const H_T52 = [{ args: [1], expected: 1}];
        const H_T53 = [{ args: [2], expected: 1 }];
        const H_T54 = [{ args: [3], expected: 2 }];
        const H_T55 = [{ args: [10], expected: 55 }];

        runTests(H_Q5, H_T51).then(result => {
            const expected = H_T51[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q5, H_T52).then(result => {
            const expected = H_T52[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q5, H_T53).then(result => {
            const expected = H_T53[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q5, H_T54).then(result => {
            const expected = H_T54[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(H_Q5, H_T55).then(result => {
            const expected = H_T55[0].expected;
            expect(result).to.equal(expected);
        })
    })

})
