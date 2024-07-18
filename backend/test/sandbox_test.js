import { expect } from 'chai'
import { runTests } from '../utils/sandbox.js'

const E_Q1 = `function TestFunction(a,b) {return a + b}`;
const E_Q2 = `function TestFunction(a,b) {return a - b}`;
const E_Q3 =  `function TestFunction(a,b) {return a * b}`;
const E_Q4 =  `function TestFunction(a,b) {return a / b}`;

// let E_Q5 = `function TestFunction(n) return n%2 == 0;`;


// let M_Q1 = `function TestFunction(numbers) {
// return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
// }`;
const M_Q2 = `function TestFunction(arr) {
                const sum = arr.reduce((a, b) => a + b, 0);
                return sum / arr.length || null
            }`;
const M_Q3 = `function TestFunction(arr) {return arr.length ? Math.max(...arr) : null}`;
const M_Q4 = `function TestFunction(arr) {
                const sorted = arr.slice().sort((a, b) => a - b);
                const len = sorted.length;
                return len % 2 ? sorted[Math.floor(len / 2)] : (sorted[len / 2 - 1] + sorted[len / 2]) / 2;
            }`; 

const M_Q5 = `function TestFunction(str) {
                const words = str.split(' ');
                return Math.max(...words.map(word => word.length));
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

    it('testMedian should return the median value in the given array or return null if the array is empty', () => {
        const M_T41 = [{ args: [[-9, -4, -2]], expected: -4 }];
        const M_T42 = [{ args: [[2]], expected: 2}];
        const M_T43 = [{ args: [[4, 7, 8, 2]], expected: 4 }];
        const M_T44 = [{ args: [[]], expected: null}];

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
    })

    it('testLongestString should return the length of the longest word in the given string of words or return 0 if the string is empty', () => {
        const M_T51 = [{ args: ["Tree"], expected: 4 }];
        const M_T52 = [{ args: [""], expected: 0 }];
        const M_T53 = [{ args: ["   "], expected: 0 }];
        const M_T54 = [{ args: ["The is a testttt"], expected: 7}];
        const M_T55 = [{ args: ["such a beautiful weather!"], expected: 9 }];

        runTests(M_Q5, M_T51).then(result => {
            const expected = M_T51[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q5, M_T52).then(result => {
            const expected = M_T52[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q5, M_T53).then(result => {
            const expected = M_T53[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q5, M_T54).then(result => {
            const expected = M_T54[0].expected;
            expect(result).to.equal(expected);
        })

        runTests(M_Q5, M_T55).then(result => {
            const expected = M_T55[0].expected;
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