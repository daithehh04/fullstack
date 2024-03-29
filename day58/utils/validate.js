const { check } = require("express-validator");
module.exports = {
  login: () => {
    return [
      check("email", "Vui lòng nhập đúng định dạng email!").isEmail(),
      check("password", "Mật khẩu phải có ít nhất 6 kí tự").isLength({
        min: 6,
      }),
    ];
  },
  register: () => {
    return [
      check("name", "Vui lòng nhập trường này!").notEmpty(),
      check("email", "Vui lòng nhập đúng định dạng email!").isEmail(),
      check("password", "Mật khẩu phải có ít nhất 6 kí tự").isLength({
        min: 6,
      }),
    ];
  },
  edit: () => {
    return [
      check("name", "Vui lòng nhập trường này!").notEmpty(),
      check("email", "Vui lòng nhập đúng định dạng email!").isEmail(),
    ];
  },
  password: () => {
    return [
      check("passwordOld", "Vui lòng nhập trường này!").notEmpty(),
      check("passwordNew", "Mật khẩu phải có ít nhất 6 kí tự").isLength({
        min: 6,
      }),
      check(
        "passwordNew",
        "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
      ).isStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
      }),
      check("rePasswordNew", "Vui lòng nhập trường này!").notEmpty(),
    ]
  },
  getError: (errors, field) => {
    const err = errors.find((e) => e.path === field);
    if (err) {
      return err.msg;
    }
  },
};
