//Bài 1 Hoán vị 2 số
var a1 = 2;
var b1 = 3;
var sum = a1 + b1;

a1 = b1;
b1 = sum - a1;
console.log(a1, b1);
//Bài 2 Tính toán biểu thức S = (10 + 20 + 5) ^ (10 / 2);
var s = (10 + 20 + 5) ** (10 / 2);
console.log(s);

//Bài 3 Tìm số lớn nhất trong 3 số
var a2 = 2;
var b2 = 5;
var c2 = 4;

var max = a2;
if (max < b2) {
    max = b2;
}
if (max < c2) {
    max = c2;
}
console.log(max);

//Bài 4 Kiểm tra số cùng dấu

var a3 = 2;
var b3 = -1;

var c3 = a3 * b3;
if (c3 < 0) {
    console.log("2 số khác dấu");
} else if (c3 > 0) {
    console.log("2 số cùng dấu");
} else {
    console.log("ít nhất 1 trong 2 số bằng 0");
}

//Bài 5 Sắp xếp tăng dần 3 số

var a4 = 10;
var b4 = 7;
var c4 = 9;

if (a4 > b4) {
    var temp = a4;
    a4 = b4;
    b4 = temp;
}
if (b4 > c4) {
    var temp = b4;
    b4 = c4;
    c4 = temp;
}

if (a4 > b4) {
    var temp = a4;
    a4 = b4;
    b4 = temp;
}
console.log(a4, b4, c4);
