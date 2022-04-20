let text = "AGCTU";
let noSpaces = /^\S*$/;
let noLowCase = /^[^a-z]*$/;
let onlyAGCT = /^[AGCT]*$/;

let result1 = noSpaces.test(text);
let result2 = noLowCase.test(text);
let result3 = onlyAGCT.test(text);
let result = result1 && result2 && result3;

console.log(result1)
console.log(result2)
console.log(result3)
console.log(result)