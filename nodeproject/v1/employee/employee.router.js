const router = require('express').Router();
const {createEmployee, getEmployee, getEmployeeById, updateEmployeeById, deleteByEmployeeId} = require("./employee.controller");

router.post("/", createEmployee);
router.get("/", getEmployee);
router.get("/:id", getEmployeeById);
router.patch("/", updateEmployeeById);
router.delete("/:id", deleteByEmployeeId);

module.exports = router;