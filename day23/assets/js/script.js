const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $('.form-group')
const overlay = $('.overlay')
const btn = $('.container .row')

const titleForms = $$('.row-title .item-title')
const listForms = $$('.form-item')
const showHideLogin = $('.form-login .field-input .show-hide i')
const fieldPasswordLogin = $(".form-login input[type='password']")
const showHideRegister = $('.form-register .field-input .show-hide i')
const fieldPasswordRegister = $(".form-register input[type='password']")
const formLogin = $(".form-login")
const formRegister = $(".form-register")

const errEmailLogin = $(".form-login .field-input .err-email")
const errPasswordLogin = $(".form-login .field-input .err-password")
const emailLogin = $(".form-login #email")
const passLogin =  $(".form-login #password")

const errEmailRegister = $(".form-register .field-input .err-email")
const errPasswordRegister = $(".form-register .field-input .err-password")
const emailRegister = $(".form-register #email")
const passRegister =  $(".form-register #password")
const nameRegister = $(".form-register #name")
const errNameRegister = $(".form-register .field-input .err-name")


// Overlay - form
btn.onclick = function() {
  form.classList.add('active')
  overlay.classList.add('active')
}

overlay.onclick = function() {
  form.classList.remove('active')
  overlay.classList.remove('active')
  resetFormLogin()
  resetFormRegister()
}
// Switch Login - Register
titleForms.forEach((title,index) => {
  const form = listForms[index]
  title.addEventListener('click',function() {
    $('.item-title.active').classList.remove('active')
    $('.form-item.active').classList.remove('active')
    this.classList.add('active')
    form.classList.add('active')
    resetFormLogin()
    resetFormRegister()
  })
})

// Show - hide password
const showHidePass = function(element,field) {
  element.classList.toggle('fa-eye-slash')
  element.classList.toggle('fa-eye')
  if (field.type === 'password') {
    field.type = 'text'
  } else {
    field.type = 'password'
  }
}
showHideLogin.addEventListener('click',function() {
  showHidePass(this,fieldPasswordLogin)
})

showHideRegister.addEventListener('click',function() {
  showHidePass(this,fieldPasswordRegister)
})

// Validate Form

function ValidateEmail(mail,ele) 
{
  if(mail.value === "") {
    ele.innerHTML = "Vui lòng nhập thông tin"
  } else {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))
    {
      ele.innerHTML = ""
    } else {
      ele.innerHTML = "Vui lòng nhập đúng định dạng email"
  }
  }
}

function ValidatePassword(pass,ele) {
  if(pass.value === "") {
    ele.innerHTML = "Vui lòng nhập thông tin"
  } else {
    if (pass.value.length >= 6 && pass.value.length < 20) {
      ele.innerHTML = ""
    }  else {
      ele.innerHTML = "Mật khẩu có từ 6 đến 20 ký tự"
    }
  }
}

function ValidateName(name,ele) {
  if(name.value === "") {
    ele.innerHTML = "Vui lòng nhập thông tin"
  }else {
    ele.innerHTML = ""
  }
}

// Reset form
function resetFormLogin() {
  formLogin.reset()
  errEmailLogin.innerHTML = ""
  errPasswordLogin.innerHTML = ""
}

function resetFormRegister() {
  formRegister.reset()
  errEmailRegister.innerHTML = ''
  errNameRegister.innerHTML = ''
  errPasswordRegister.innerHTML =''
}

// Blur, Input

// Login
passLogin.addEventListener('input', function() {
  ValidatePassword(passLogin,errPasswordLogin)
  ValidateEmail(emailLogin,errEmailLogin)
})

emailLogin.addEventListener('input', function() {
  ValidateEmail(emailLogin,errEmailLogin)
  ValidatePassword(passLogin,errPasswordLogin)
})

passLogin.addEventListener('blur',function() {
  if(passLogin.value === "" && emailLogin.value === "") {
    errPasswordLogin.innerHTML = "Vui lòng nhập thông tin"
    errEmailLogin.innerHTML = "Vui lòng nhập thông tin"
  }
})

emailLogin.addEventListener('blur',function() {
  if(passLogin.value === "" && emailLogin.value === "") {
    errPasswordLogin.innerHTML = "Vui lòng nhập thông tin"
    errEmailLogin.innerHTML = "Vui lòng nhập thông tin"
  }
})

// Register
nameRegister.addEventListener('input', function() {
  ValidateName(nameRegister,errNameRegister)
  ValidateEmail(emailRegister,errEmailRegister)
  ValidatePassword(passRegister,errPasswordRegister)
})
passRegister.addEventListener('input', function() {
  ValidatePassword(passRegister,errPasswordRegister)
  ValidateEmail(emailRegister,errEmailRegister)
  ValidateName(nameRegister,errNameRegister)
})

emailRegister.addEventListener('input', function() {
  ValidateEmail(emailRegister,errEmailRegister)
  ValidatePassword(passRegister,errPasswordRegister)
  ValidateName(nameRegister,errNameRegister)
})

passRegister.addEventListener('blur',function() {
  if(passRegister.value === "" && emailRegister.value === "" && nameRegister.value === "") {
    errPasswordRegister.innerHTML = "Vui lòng nhập thông tin"
    errEmailRegister.innerHTML = "Vui lòng nhập thông tin"
    errNameRegister.innerHTML = "Vui lòng nhập thông tin"
  }
})

emailRegister.addEventListener('blur',function() {
  if(passRegister.value === "" && emailRegister.value === "" && nameRegister.value === "") {
    errPasswordRegister.innerHTML = "Vui lòng nhập thông tin"
    errEmailRegister.innerHTML = "Vui lòng nhập thông tin"
    errNameRegister.innerHTML = "Vui lòng nhập thông tin"
  }
})
nameRegister.addEventListener('blur',function() {
  if(passRegister.value === "" && emailRegister.value === "" && nameRegister.value === "") {
    errPasswordRegister.innerHTML = "Vui lòng nhập thông tin"
    errEmailRegister.innerHTML = "Vui lòng nhập thông tin"
    errNameRegister.innerHTML = "Vui lòng nhập thông tin"
  }
})