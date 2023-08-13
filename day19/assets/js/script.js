// Bài 1. Tìm số lớn nhất, nhỏ nhất trong mảng và vị trí

var numbers = [3,7,5,11,2,9]

const getMinMax = (arr) => {
  var max = arr[0]
  var min = arr[0]
  var indexMax = 0
  var indexMin = 0
  for (let i = 0; i< arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i]
      indexMax = i
    }
    if (min > arr[i]) {
      min = arr[i]
      indexMin = i
    }
  }
  console.log(`Max là: ${max} tại vị trí ${indexMax}`);
  console.log(`Min là: ${min} tại vị trí ${indexMin}`);
}

getMinMax(numbers)

// ================================================

// Bài 2. Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”

var numbers2 = [11,2,6,4,8,7]

const isPrime = (num) => {
  if (num % 1 !== 0 || num <= 1)  return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const averagePrimaryArray = (arr) => {
  var arrPrime = []
  var total = 0
  for (let index in arr) {
    if (isPrime(arr[index])) {
        arrPrime.push(arr[index]);
        total += arr[index];
    }
  }
  if (!!arrPrime.length) {
    var avgPrime = total / arrPrime.length
    console.log(`Giá trị trung bình của các số nguyên tố là : ${avgPrime}`);
  } else {
    console.log("Mảng không có số nguyên tố");
  }
}

averagePrimaryArray(numbers2)

// ================================================

// Bài 3. Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý

var numbers3 = [3,6,4,9,2,3]

function filterArray(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
console.log(filterArray(numbers3));

// Cách 2
// function filterArray2(arr) {
//   const newArr = new Set(arr)
//   return Array.from(newArr)
// }

// console.log(filterArray2(numbers3))

// ================================================

// Bài 4 Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau
// Sắp xếp mảng theo thứ tự tăng dần
// Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng

var numbers4 = [5, 1, 9, 8, 10];
var element = 4;

function sortArray(arr, addNum) {
  arr.sort((a, b) => a - b)
  if (addNum > arr[arr.length-1]) {
    arr.push(addNum)
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > addNum) {
        arr.splice(i, 0, addNum);
        break;
      }
    }
  }
  return arr;
}

console.log(sortArray(numbers4,element));