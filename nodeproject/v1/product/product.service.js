const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name must be required field"]},
    description: {type: String, required: [true, "description must be required field"]},
    image: {type: String},
    amount: {type: Number, required: [true, "amount must be required field"]}
}, {timestamps: true})

module.exports = mongoose.model("Product", ProductSchema);