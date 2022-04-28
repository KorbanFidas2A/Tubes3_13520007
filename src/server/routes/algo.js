// memvalidasi inputan DNA
function DNAValidation(DNA) {
  let regex = /^[ATCG]*$/;
  return regex.test(DNA);
}

// mengekstrak query dari string
// return array [tanggal, penyakit]
function queryExtract(query) {
  const re_tanggal =
    /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/g;
  const re_penyakit = /[a-zA-Z0-9\s]+/g;
  const re_space = /\s+/;
  const re_dot = /\./g;
  const re_dash = /-/g;

  var tanggal;
  if (re_tanggal.test(query)) {
    tanggal = query.match(re_tanggal)[0];
    tanggal = tanggal.replace(re_dash, "/").replace(re_dot, "/");
    query = query.replace(re_tanggal, "");
    query = query.replace(re_space, "");
  } else {
    tanggal = "";
  }

  var penyakit;
  if (re_penyakit.test(query)) {
    penyakit = query.match(re_penyakit)[0];
  } else {
    penyakit = "";
  }

  return [tanggal, penyakit];
}

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
      if (j == m - 1) {
        return i - m + 1;
      }
      i++;
      j++;
    } else if (j > 0) {
      j = fail[j - 1];
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
      j = fail[j - 1];
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
  let i = m - 1;

  if (i > n - 1) {
    return -1;
  }

  let j = m - 1;

  do {
    if (pattern.charAt(j) == text.charAt(i)) {
      if (j == 0) {
        return i;
      } else {
        i--;
        j--;
      }
    } else {
      let lastOccur = last[text.charAt(i).charCodeAt()];
      i = i + m - Math.min(j, 1 + lastOccur);
      j = m - 1;
    }
  } while (i <= n - 1);

  return -1;
}

// BM helper function untuk menyimpan index last occurence dari karakter
function buildLast(pattern) {
  const last = new Array(128);

  for (let i = 0; i < 128; i++) {
    last[i] = -1;
  }

  for (let i = 0; i < pattern.length; i++) {
    last[pattern.charAt(i).charCodeAt()] = i;
  }

  return last;
}

// menghitung persentase kemiripan menggunakan LCS
function similarityTest(text, pattern) {
  let charSimilar = LCS(text, pattern);
  return (charSimilar / pattern.length) * 100;
}

// Longest Common Subsequence, menghitung jumlah karakter yang sama
// pada pola yang sama (sequential tapi tidak harus contigous)
function LCS(text, pattern) {
  let m = text.length;
  let n = pattern.length;
  const L = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(null));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i == 0 || j == 0) {
        L[i][j] = 0;
      } else if (pattern.charAt(j - 1) == text.charAt(i - 1)) {
        L[i][j] = L[i - 1][j - 1] + 1;
      } else {
        L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
      }
    }
  }

  return L[m][n];
}

module.exports = {
  DNAValidation: function (DNA) {
    return DNAValidation(DNA);
  },
  queryExtract: function (query) {
    return queryExtract(query);
  },
  bmMatch: function (text, pattern) {
    return bmMatch(text, pattern);
  },
  kmpMatch: function (text, pattern) {
    return kmpMatch(text, pattern);
  },
  similarityTest: function (text, pattern) {
    return similarityTest(text, pattern);
  },
};
