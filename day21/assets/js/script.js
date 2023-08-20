// Bài 1
var errors = {
  name: {
      required: "Vui lòng nhập họ tên",
      min: "Họ tên phải từ 5 ký tự"
  },
  email: {
      email: "Định dạng email không hợp lệ",
      unique: "Email đã có người sử dụng",
      required: "Vui lòng nhập địa chỉ email"
  },
  password: {
      required: "Vui lòng nhập mật khẩu",
      same: "Mật khẩu phải khớp với mật khẩu nhập lại"
  }
}

function getError(field) {
  if (errors[field]) {
    for (var key in errors[field]) {
      return errors[field][key]
    }
  } else {
    return 'Not error!'
  }
}

console.log(getError('email'));

// Bài 2

function Customer(name, age, address) {
  this.name = name
  this.age = age
  this.address = address
}

function createCustomers(arr) {
  var sortAge = arr.sort((a,b) => a.age - b.age)

  return sortAge.map((customer) => {
    var arrName = customer.name.split(" ")
    var shortName = `${arrName[0]} ${arrName[arrName.length-1]}`
    return {
      ...customer,
      shortName
    }
  })
}

const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers); 
console.log(result);

// Bài 3
function User(name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
}

var dataUser = []

function handleRegister(name, password, email) {
  if (!name || !password || !email) {
    return 'Vui lòng nhập đầy đủ thông tin!'
  } 
  if (dataUser.find(user => user.email === email)) {
    return 'Tài khoản đã tồn tại!'
  }
  const user = new User(name,password,email)
  user.role = 'User'
  dataUser.push(user)
  console.log('Đăng ký thành công!');
  return user
}

function handleLogin(email,password) {
  const user = dataUser.find(user => user.email === email && user.password === password)
  if(user) {
    return user
  } else {
    return 'Email hoặc mật khẩu không đúng!'
  }
}
const dataRegister = handleRegister(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
const dataRegister2 = handleRegister(
  "Nguyen Van B",
  "1234567",
  "nguyenvanb@email.com"
);
const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");
const dataLogin2 = handleLogin("nguyenvana@email.com", "1234567");
console.log(dataLogin);
console.log(dataLogin2);