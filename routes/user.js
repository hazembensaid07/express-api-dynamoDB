const express = require("express");
const router = express.Router();
const {
  DeleteUser,
  UpdateUser,
  GetUserByID,
  createUser,
  getAllUsers,
} = require("../controllers/user");

router.post("/add", createUser);
router.get("/one", GetUserByID);
router.put("/update", UpdateUser);
router.get("/users", getAllUsers);
router.delete("/delete", DeleteUser);
module.exports = router;