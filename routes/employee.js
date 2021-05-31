const {
  listUser,
  newUser,
  delUser,
} = require("../controllers/employee.controller");

const router = require("express").Router();

router.get("/", listUser);

router
  .route("/add")
  .get((req, res) => {
    res.render("employee");
  })
  .post(newUser);

router.get("/:id", delUser);

module.exports = router;
