function rand_int_range(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function chck(arr, num) {
  let fnd = false;
  for (let a = 0; a < arr.length; a++) {
    if (num == arr[a]) {
      fnd = true;
    }
  }
  if (!fnd) {
    arr.push(num);
  }
}
function rand_int_range_times(max, min, times) {
  let t = [];
  t.push(rand_int_range(max, min));
  while (t.length < times) {
    let r1 = rand_int_range(max, min);
    chck(t, r1);
  }
  return t;
}
function scramble_lst(arr) {
  let arr1 = rand_int_range_times(arr.length - 1, 0, arr.length);
  let arr3 = [];
  for (let a = 0; a < arr1.length; a++) {
    arr3.push(arr[arr1[a]]);
  }
  return arr3;
}
const fs = require('fs');
const { listeners } = require('process');
let lst1 = [];
let fname = 'vocabulary03.txt';
fname = 'eng8.txt';
const data = fs.readFileSync(fname, 'utf8');

lines = data.split(/\n/);
let a = 0;
let lst = [];
while (a < lines.length) {
  lst.push(lines[a]); // new vocabulary
  a++;
  lst.push(lines[a]); // meaning
  a++;
  lst.push(lines[a]); // example sentence
  a++;
  lst.push(lines[a]); // new vocabulary translate to Vietnamese
  a++;
  lst.push(lines[a]); // example sentence translates to Vietnamese
  a += 2;
  lst1.push(lst);
  l = lst1.length - 1;
  // console.log(lst1[l]);
  lst = [];
}
// replace new vocabulary in example sentence with underscore _____
lst1 = scramble_lst(lst1);

for (a = 0; a < lst1.length; a++) {
  let u_word = '';
  for (b = 0; b < lst1[a][0].length; b++) {
    u_word += '_';
  }
  // let str1 = "<abbr title='" + lst1[a][0].trim() + ": " + lst1[a][1].trim() + "'>_______</abbr>";
  let str1 = lst1[a][0].trim();
  // console.log(lst1[a][0]);
  let new_ex = lst1[a][2].replace(lst1[a][0].trim(), str1);
  lst1[a][2] = new_ex;
}

let str = '<!DOCTYPE html>\n<head>\n<title>Test</title>\n</head>\n<body>\n';
for (a = 0; a < lst1.length; a++) {
  str += lst1[a][2] + '<br>\n';
}
str += '</body>\n</html>';
// console.log(str);
fname = fname.replace('.txt', '_test.htm');

// write to new file with english sample sentence
fs.writeFile(fname, str, (err) => {
  if (err) {
    console.err;
    return;
  }
});
