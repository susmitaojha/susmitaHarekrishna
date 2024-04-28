const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "First name must be required field"]},
    lastName: {type: String, required: [true, "Last name must be required field"]},
    email: {type: String, required: [true, "Email must be required field"]},
    password: {type: String, required: [true, "Password must be required field"]},
    mobileNo: {type: Number, required: [true, "Mobile no must be required field"]}
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);