const courseModel = require("../models/course.model");
const { string, object } = require("yup");
const moment = require("moment");
module.exports = {
  index: async (req, res) => {
    // Đọc dữ liệu từ req
    const { keyword, status } = req.query;
    // Đọc dữ liệu từ course
    const courses = await courseModel.all(keyword, status);
    // const debug = await courseModel.all(keyword, status).describe()
    const msg = req.flash("msg");
    res.render("home/index", { courses, moment, msg });
  },
  add: async (req, res) => {
    const errors = req.errors;
    const olds = req.old;
    res.render("home/add", {
      errors,
      olds,
    });
  },
  handleAdd: async (req, res) => {
    /*
    - Validate
    + Tên(bắt buộc, không trùng), Giá (bắt buộc, số)
    - Insert db
    - Redirect kèm thông báo
    */
    const body = await req.validate(req.body, {
      name: string()
        .required("Tên khóa học bắt buộc phải nhập")
        .test("check-unique", "Tên khóa học đã tồn tại", async (value) => {
          return await courseModel.courseUnique(value);
        }),
      desc: string().required("Mô tả khóa học bắt buộc phải nhập"),
      price: string()
        .required("Giá khóa học bắt buộc phải nhập")
        .test("check-number", "Giá khóa học phải là số", (value) => {
          value = +value;
          if (!isNaN(value)) {
            return true;
          } else {
            return false;
          }
        }),
    });
    if (body) {
      try {
        await courseModel.create(body.name, body.price, body.desc, body.status);
      } catch (error) {
        console.log(error);
      }
      req.flash("msg", "Thêm khóa học thành công");
      return res.redirect("/");
    }
    return res.redirect("/add");
  },
  handleDelete: async (req, res) => {
    const id = parseInt(req.params.id);
    console.log("idD", id);
    if (typeof id === "number") {
      try {
        await courseModel.destroy(id);
      } catch (error) {
        console.log(error);
      }
      req.flash("msg", "Xóa khóa học thành công");
      return res.redirect("/");
    }
  },
  update: async (req, res, next) => {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).render("home/404");
      return;
    }
    const dataCourse = await courseModel.get(id);
    if (dataCourse.length) {
      const errors = req.errors;
      const olds = req.old;
      console.log("olds", olds);
      return res.render("home/update", {
        dataCourse: dataCourse[0],
        errors,
        olds,
      });
    }
    return res.status(400).render("home/404");
  },
  handleUpdate: async (req, res) => {
    const id = req.params.id;
    const body = await req.validate(req.body, {
      name: string()
        .required("Tên khóa học bắt buộc phải nhập")
        .test("check-unique", "Tên khóa học đã tồn tại", async (value) => {
          return await courseModel.courseUniqueUpdate(value, id);
        }),
      desc: string().required("Mô tả khóa học bắt buộc phải nhập"),
      price: string()
        .required("Giá khóa học bắt buộc phải nhập")
        .test("check-number", "Giá khóa học phải là số", (value) => {
          value = +value;
          if (!isNaN(value)) {
            return true;
          } else {
            return false;
          }
        }),
    });
    if (body) {
      try {
        await courseModel.update(body, id);
      } catch (error) {
        console.log(error);
      }
      req.flash("msg", "Cập nhật khóa học thành công");
      return res.redirect("/");
    }
    return res.redirect(`/update/${id}`);
  },
};
