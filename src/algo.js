let input = "AAAAAGGGCCCTTT";
let valid = /^[AGCT]*$/;

let result = valid.test(input);

console.log(result)

let toMatch = "GCCCT";

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
        } 
        else if (j > 0) {
            j = fail[j-1];
        } 
        else {
            i++;
        }
        return -1;
    }
}

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
        }
        else if (j > 0) {
            j = fail[j-1];
        }
        else {
            fail[i] = 0;
            i++;
        }
    }
    return fail;
}

