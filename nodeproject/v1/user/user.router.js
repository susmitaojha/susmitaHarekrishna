const router = require('express').Router();
const {createUser, getUser, getUserById, updateUserById, deleteByUserId, login} = require("./user.controller");
const { checkToken } = require("../../author/token_validation");

router.post("/", createUser);
router.get("/", checkToken, getUser);
router.get("/:id",checkToken, getUserById);
router.patch("/:id",checkToken, updateUserById);
router.delete("/:id",checkToken, deleteByUserId);
router.post("/login", login);

module.exports = router;