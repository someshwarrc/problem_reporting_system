module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/users/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "You are already logged in");
    res.redirect("/dashboard");
  },
  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "ADMIN") {
      return next();
    }
    req.logout();
    req.flash(
      "error_msg",
      "You must be an administrator to view this resource "
    );
    res.redirect("/users/login");
  },
  ensureExecutive: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role.split("-")[0] === "EXECUTIVE") {
      return next();
    }
    req.logout();
    req.flash("error_msg", "You must be an executive to view this resource ");
    res.redirect("/users/login");
  },
  ensureStaff: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "STAFF") {
      return next();
    }
    req.logout();
    req.flash("error_msg", "Only staff can view this resource ");
    res.redirect("/users/login");
  },
};
