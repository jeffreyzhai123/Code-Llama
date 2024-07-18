import { expect } from 'chai';
import { testSelector } from '../utils/sandbox.js';

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

let M_Q1 = `function TestFunction(numbers) {
return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}`;


const M_Q6 = `function TestFunction(numberToFind, arrayOfNumbers) {
    
    let found = arrayOfNumbers.filter(num => num === numberToFind).length;

    if(found > 0) {
        return true;
    } else {
        return false;
    }
}`;

const M_Q6_wrong = `function TestFunction(key, array){
    if (array.length === 0) {
        return false;
    }
    
    return key === array[0];
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

// Remove any non-alphanumeric characters and convert the string to lowercase
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




describe("test M_Q6", function() {
    it('M_Q6 correct', async() => {
        const test_result = await testSelector(6, M_Q6, 2);
        expect(test_result)
        .to
        .include("passed");
    });

    it('M_Q6 icorrect', async() => {
        const test_result = await testSelector(6, M_Q6_wrong, 2);
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