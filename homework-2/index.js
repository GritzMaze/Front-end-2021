function isGoodBadString(input) {
  if (!input) return 'GOOD';
  else {
    input = input.toLowerCase();
    let charMap = {};
    for (let char of input) {
      if (!charMap[char]) {
        charMap[char] = 1;
      } else {
        charMap[char]++;
      }
    }
    let values = Object.values(charMap);
    values.sort();
    let isGood = (values[0] === 1) && (values[1] > 2);
    let isGood2 = (values[0] === values[1] + 1) || (values[values.length - 1] === values[values.length - 2] + 1);
    let uniqValues = [...new Set(values)];
    values[values.length - 1]--;
    let uniqValues2 = [...new Set(values)];
    if (uniqValues.length === 1) {
      return "GOOD";
    } else if (uniqValues2.length === 1) {
      return "BAD";
    } else if (uniqValues.length === 2 && (isGood || isGood2)) {
      return "BAD";
    } else return "UGLY";
  }
}

console.log(isGoodBadString("gaa") === "BAD");
console.log(isGoodBadString("llkkfg") === "UGLY");
console.log(isGoodBadString('ggghhhmmmdddlll') === "GOOD");
console.log(isGoodBadString('gghmmmdddll') === "UGLY");
console.log(isGoodBadString('asfdgf') === "BAD");
console.log(isGoodBadString('') === "GOOD");
console.log(isGoodBadString('GgHH') === "GOOD");
console.log(isGoodBadString('abbcc') === "UGLY");
console.log(isGoodBadString('aBA') === "BAD");
console.log(isGoodBadString('kaabbccc') === "UGLY");
console.log(isGoodBadString('v') === "GOOD");
console.log(isGoodBadString("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbB") === "UGLY");
console.log(isGoodBadString("aa  bb") === "GOOD");
console.log(isGoodBadString(" ") === "GOOD");
console.log(isGoodBadString("\nb\naa") === "UGLY");
console.log(isGoodBadString("aaaabcccc") === "BAD");
console.log(isGoodBadString("\nb\naa") === "UGLY");

processData([1, 2, 3, 4]);
processData(["test", 1, "world", "42", 2]);
processData([1, "123456789", [1, 2, [3, 4]], function (a) {
    return a;
}, {
    "name": "Martin"
}, 3, 4, 5, function (a) {
    return (a + 1)
}]);
let ele = [1, 2, [3, 4]];
console.log(JSON.stringify(ele.flat()));
console.log((ele.flat()));

function processData(input) {
    var result = [];
    input = eval(input);
    let numbers = 0;
    for (let element of input) {
        if (typeof element === "number") {
            numbers++;
        } else if (typeof element === "string") {
            result.push(element.split('').reverse().join(''));
        } else if (Array.isArray(element)) {
            if (JSON.stringify(element) === JSON.stringify(element.flat())) {
                result.push(element.sort());
            } else {
                result.push(element.flat(Infinity));
            }
        } else if (typeof element === "object") {
            let keys = Object.keys(element);
            if (keys.length === 1) {
                result.push(keys[0] + ": " + element[keys[0]]);
            } else {
                result.push(element);
            }
        } else if (typeof element === "function") {
            result.push(element(42));
        }
    }
    if (numbers > 0) {
        result.unshift(numbers);
    }
    console.log(JSON.stringify(result));
}