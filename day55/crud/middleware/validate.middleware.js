const { object } = require("yup");
module.exports = async (req, res, next) => {
  // Sửa req
  const errors = req.flash("errors");
  req.errors = errors.length ? errors[0] : {};
  const old = req.flash("old");
  req.old = old.length ? old[0] : {};

  req.validate = async (data, rule = {}) => {
    const schema = object(rule);
    try {
      const body = await schema.validate(data, {
        abortEarly: false,
      });
      return body;
    } catch (e) {
      let errors = e.inner.map(({ path, message }) => [path, message]);
      errors = Object.fromEntries(errors);
      req.flash("old", data);
      req.flash("errors", errors);
    }
  };
  next();
};
