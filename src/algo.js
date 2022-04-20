let text = "AAAAAGGGCCCTTT";
let valid = /^[AGCT]*$/;

let result = valid.test(text);

console.log(result)