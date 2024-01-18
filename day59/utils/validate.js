const { check } = require("express-validator")
module.exports = {
  sendmail: () => {
    return [
      check("email", "Vui lòng nhập đúng định dạng email!").isEmail(),
      check("title", "Vui lòng nhập trường này!").notEmpty(),
      check("content", "Vui lòng nhập trường này!").notEmpty(),
    ]
  },
  getError: (errors, field) => {
    const err = errors.find((e) => e.path === field)
    if (err) {
      return err.msg
    }
  },
}
