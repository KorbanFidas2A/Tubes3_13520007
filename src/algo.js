let input = "AAAAAGGGCCCTTT";
let valid = /^[AGCT]*$/;

let result = valid.test(input);

console.log(result)

let toMatch = "AGGGCCCTTC";

console.log(kmpMatch(input, toMatch))
console.log(bmMatch(input, toMatch))
let a = "sitting";
let b = "kitten";

console.log(levenshteinDist(input, toMatch))
console.log(similarityTest(input, toMatch))

// KMP algorithm, return index di mana pattern ditemukan jika pattern
// ditemukan pada text, return -1 jika pattern tidak ditemukan
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
    }
    
    return -1;
}

// KMP border function
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

// Boyer-Moore algorithm, return index di mana pattern ditemukan jika
// pattern ditemukan pada text, return -1 jika pattern tidak ditemukan
function bmMatch(text, pattern) {
    const last = buildLast(pattern);

    let n = text.length;
    let m = pattern.length;
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
            let lastOccur = last[(text.charAt(i)).charCodeAt()];
            i = i + m - Math.min(j, 1 + lastOccur);
            j = m - 1;
        } 
    } while (i <= n-1);

    return -1;
}

// BM helper function untuk menyimpan index last occurence dari karakter
function buildLast(pattern) {
    const last = new Array(128);

    for (let i = 0; i < 128; i++) {
        last[i] = -1;
    }

    for (let i = 0; i < pattern.length; i++) {
        last[(pattern.charAt(i)).charCodeAt()] = i;
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



function levenshteinDist(text, pattern) {
    let m = text.length;
    let n = pattern.length;

    const distance = Array(n + 1).fill(null).map(() => Array(m + 1).fill(null));
    
    for (let i = 0; i <= m; i++) {
        distance[0][i] = i;
    }

    for (let j = 0; j <= n; j++) {
        distance[j][0] = j;
    }

    var subsCost;
    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (pattern.charAt(j-1) == text.charAt(i-1)) {
                subsCost = 0;
            } else {
                subsCost = 1;
            }
            //console.log('delete:', distance[j][i-1] + 1)
            //console.log('insert:',distance[j-1][i] + 1)
            //console.log('substitute:', distance[j-1][i-1] + subsCost)
            distance[j][i] = Math.min(distance[j][i-1] + 1,             // deletion
                                      distance[j-1][i] + 1,             // insertion
                                      distance[j-1][i-1] + subsCost);   // substitution
        }
    }

    return distance[n][m];
}

// Longest Common Subsequence, menghitung jumlah karakter yang sama
// pada pola yang sama (sequential tapi tidak harus contigous) 
function LCS(text, pattern) {
    let m = text.length;
    let n = pattern.length;
    const L = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));
    
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                L[i][j] = 0;
            } else if (pattern.charAt(j-1) == text.charAt(i-1)) {
                L[i][j] = L[i-1][j-1] + 1;
            } else {
                L[i][j] = Math.max(L[i-1][j], L[i][j-1]);
            }
        }
    }

    return L[m][n];    
}

// menghitung persentase kemiripan
function similarityTest(text, pattern) {
    let charSimilar = LCS(text, pattern);
    return (charSimilar / pattern.length) * 100;
}