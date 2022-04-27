let input = "AAAAAGGGCCCTTT";
let valid = /^[AGCT]*$/;

let result = valid.test(input);

console.log(result)

let toMatch = "GCCCT";

// KMP algorithm
function kmpMatch(text, pattern) {
    let n = text.length;
    let m = pattern.length;

    const fail = computeFail(pattern);

    let i = 0;
    let j = 0;

    while (i < n) {
        if (pattern.charAt(j) == text.charAt(i)) {
            if (j == m-1) {
                return (i - m + 1);
            }
            i++;
            j++;
        } else if (j > 0) {
            j = fail[j-1];
        } else {
            i++;
        }
        return -1;
    }
}
// KMP helper func
function computeFail(pattern) {
    const fail = new Array(pattern.length);
    fail[0] = 0;

    let m = pattern.length;
    let j = 0;
    let i = 1;

    while (i < m) {
        if (pattern.charAt(j) == pattern.charAt(i)) {
            fail[i] = j + 1;
            i++;
            j++;
        } else if (j > 0) {
            j = fail[j-1];
        } else {
            fail[i] = 0;
            i++;
        }
    }
    return fail;
}

// Boyer-Moore algorithm
function bmMatch(text, pattern) {
    let n = text.length;
    let m = pattern.length;

    const fail = buildLast(pattern);

    let i = m-1;
    if (i > n-1) {
        return -1;
    }

    let j = m-1;

    do {
        if (pattern.charAt(j) == text.charAt(i)) {
            if (j == 0) {
                return i;
            } else {
                i--;
                j--;
            }
        } else {
            let lo = last[text.charAt(i)];
            i = i + m - Math.min(j, 1+lo);
            j = m - 1;
        } 
    } while (i <= n-1);

    return -1;
}

function buildLast(pattern) {
    const last = new Array(128);

    for (let i = 0; i < 128; i++) {
        last[i] = -1;
    }

    for (let i = 0; i < pattern.length; i++) {
        last[pattern.charAt(i)] = i;
    }

    return last;
}

// count how many different char
function hammingDistance(text1, text2) {
    if (text1.length !== text2.length) {
       return 0;
    }

    let dist = 0;
    
    for (let i = 0; i < text1.length; i++) {
       if (text1[i] !== text2[i]) {
          dist++;
       };
    };
    
    return dist;
 };