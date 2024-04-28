const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "First name must be required field"]},
    lastName: {type: String, required: [true, "Last name must be required field"]},
    mobileNo: {type: Number, required: [true, "Mobile no must be required field"]}
}, {timestamps: true})

module.exports = mongoose.model("Employee", EmployeeSchema);