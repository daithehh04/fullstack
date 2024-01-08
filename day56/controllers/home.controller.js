module.exports = {
  index: async (req, res) => {
    const user = req.session.user;
    const login = req.session.login;
    if (login) {
      return res.render("index", { user });
    }
    return res.redirect("/login");
  },
};
