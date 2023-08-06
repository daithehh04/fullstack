// Bài 1 Tính tiền taxi
const distance = 15;
const price1 = 15000;
const price2 = 13500;
const price3 = 11000;
let totalTaxi, price, discount;
if (distance > 0) {
    if (distance <= 1) {
        totalTaxi = price1 * distance;
    } else if (distance > 1 && distance <= 5) {
        totalTaxi = price1 + price2 * (distance - 1);
    } else {
        totalTaxi = price1 + price2 * 4 + price3 * (distance - 5);
        if (distance > 120) {
            discount = 10;
            totalTaxi = totalTaxi - (totalTaxi * discount) / 100;
        }
    }
    console.log(`Tổng số tiền đi hết ${distance}km là: ${totalTaxi}`);
} else {
    console.log("Vui lòng nhập đúng định dạng!");
}

// Bài 2 Tình tiền điện
const numberKWh = 200;
let totalBill;
const priceKwh1 = 1678;
const priceKwh2 = 1734;
const priceKwh3 = 2014;
const priceKwh4 = 2536;
const priceKwh5 = 2834;
const priceKwh6 = 2927;

if (numberKWh > 0) {
    if (numberKWh <= 50) {
        totalBill = priceKwh1 * numberKWh;
    } else if (numberKWh > 51 && numberKWh <= 100) {
        totalBill = 50 * priceKwh1 + priceKwh2 * (numberKWh - 50);
    } else if (numberKWh > 101 && numberKWh <= 200) {
        totalBill =
            50 * priceKwh1 + 50 * priceKwh2 + priceKwh3 * (numberKWh - 100);
    } else if (numberKWh > 201 && numberKWh <= 300) {
        totalBill =
            50 * priceKwh1 +
            50 * priceKwh2 +
            100 * priceKwh3 +
            priceKwh4 * (numberKWh - 200);
    } else if (numberKWh > 301 && numberKWh <= 400) {
        totalBill =
            50 * priceKwh1 +
            50 * priceKwh2 +
            100 * priceKwh3 +
            100 * priceKwh4 +
            priceKwh5 * (numberKWh - 300);
    } else if (numberKWh >= 401) {
        totalBill =
            50 * priceKwh1 +
            50 * priceKwh2 +
            100 * priceKwh3 +
            100 * priceKwh4 +
            100 * priceKwh5 +
            priceKwh6 * (numberKWh - 400);
    }
    console.log(`Tổng số tiền điện là: ${totalBill}`);
} else {
    console.log("Yêu cầu nhập đúng định dạng");
}

// Bài 3 Tính giá trị biểu thức

const n = 10;
let total = 0;
for (let i = 1; i <= n; i++) {
    total += i * (i + 1);
}

console.log(`Giá trị biểu thức là: ${total}`);

// Bài 4 Viết hàm kiểm tra số nguyên tố

const isPrime = (num) => {
    if (num % 1 === 0) {
        if (num <= 1) {
            return false;
        } else {
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) {
                    return false;
                }
            }
            return true;
        }
    } else {
        return false;
    }
};

if (isPrime(19)) {
    console.log(`Đây là số nguyên tố`);
} else {
    console.log(`Đây không phải số nguyên tố!`);
}

// Bài 5 Vẽ tam giác số

const drawTriangle = (n) => {
    if (n % 1 === 0 && n > 0) {
        let result = "";
        let number = 1;

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= i; j++) {
                result += number + " ";
                number++;
            }
            result += "\n";
        }
        return result;
    } else {
        console.log("Nhập lại n hợp lệ!");
    }
};

console.log(drawTriangle(5));

// bài 6 Vẽ bàn cờ vua
document.write("<h2>Vẽ bàn cờ vua</h2>");
const chess = () => {
    let chess = "";
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            if ((i + j) % 2 !== 0) {
                document.write(
                    `<span style="display: inline-block; width: 50px; height: 50px; border: 1px solid #000; background-color: #000;"></span>`
                );
            } else {
                document.write(
                    `<span style="display: inline-block; width: 50px; height: 50px;border: 1px solid #000; background-color: #fff;"></span>`
                );
            }
        }

        document.write("<br/>");
    }

    return chess;
};
chess();

// bài 7 vẽ bảng cửu chương
const mulTable = document.getElementById("multiplication-table");
for (let i = 1; i <= 10; i++) {
    const row = document.createElement("tr");
    for (let j = 1; j <= 10; j++) {
        row.appendChild(
            document.createElement("td")
        ).innerHTML = `${i} x ${j} = ${i * j}`;
    }
    mulTable.appendChild(row);
}

// Bài 8
const num = 4;
const sum = (n) => {
    if (n === 1) {
        return 1;
    } else {
        return 1 / n + sum(n - 1);
    }
};

const S = sum(num);
console.log(`Giá trị của biểu thức S là: ${S}`);
