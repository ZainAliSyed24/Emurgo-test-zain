function input(arrayStart, iStart, strEnd, arrayRes) {
  for (var i = iStart; i < arrayStart.length; i++) {
    if (arrayStart[i] === "*") {
      input(arrayStart, i + 1, strEnd + "0", arrayRes);
      input(arrayStart, i + 1, strEnd + "1", arrayRes);
      return;
    } else {
      strEnd += arrayStart[i];
    }
  }
  arrayRes.push(strEnd);
}

function output(str) {
  var arrayResult = [];
  input(str.split(""), 0, "", arrayResult);

  return arrayResult;
}
console.log("output", output("*1"));
