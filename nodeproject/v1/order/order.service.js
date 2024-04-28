const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId :{type: mongoose.Types.ObjectId, required: [true, "User must be required field"]},
        ProductId:{type: mongoose.Types.ObjectId, require: [true, "Product id must be required field"]},
        quantities: {type: Number, require: [true, "Quantities must be required field"]}, 
        unitAmount: {type: Number, require: [true, "Unit Amount must be required field"]},
        totalAmount: {type: Number, require: [true, "Total Amount must be required field"]}
    },{timestamps: true}
)
module.exports = mongoose.model("Order", OrderSchema);