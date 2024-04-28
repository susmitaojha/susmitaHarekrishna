const Order = require("./order.service");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
    const body = req.body; 
    try{

        const orderRecord = new Order({
            userId: new mongoose.Types.ObjectId(body.userId),
            ProductId: new mongoose.Types.ObjectId(body.ProductId),
            quantities: body.quantities,
            unitAmount: body.unitAmount,
            totalAmount: body.totalAmount
        });
        const order = await orderRecord.save();
       
        return res.status(200).json({
            success: 1,
            data: order
        });
    }catch(e){
        
        return res.status(404).json({
            success: 0,
            msg: e
        })
    }
}


const getOrder = async (teq, res) => {
   


     try{
        const order = await Order.aggregate([
            {
                $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users'
            }},
            {
                $lookup: {
                from: 'products',
                localField: 'ProductId',
                foreignField: '_id',
                as: 'products'
            }},
            {
                $project: {"users.firstName":1, "products.name":1,"users.lastName":1}
            }
        ]);
        return res.status(200).json({
            success: 1,
            data: order
        }) 
    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        }) 
    }
}


const updateOrder = async (req, res) => {
    const body = req.body;
    try{
        const order = await Order.updateOne({_id:  new mongoose.Types.ObjectId(body.id)},{
            userId: new mongoose.Types.ObjectId(body.userId),
            ProductId: new mongoose.Types.ObjectId(body.ProductId),
            quantities: body.quantities,
            unitAmount: body.unitAmount,
            totalAmount: body.totalAmount
        });
       
        return res.status(200).json({
            success: 1,
            msg: "Update success"
        })
    }catch(e){
        
        return res.status(404).json({
            success: 0,
            msg: e
        })
    }
}


module.exports = {
    createOrder: createOrder,
    getOrder: getOrder,
    updateOrder: updateOrder
}