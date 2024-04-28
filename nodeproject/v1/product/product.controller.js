const Product = require("./product.service");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const createProduct = async(req, res) =>{

    const body = req.body; 
    try{

        let filePath = '../../images';
        var imagename = Date.now()+'.png';       
        const imagepath = filePath+'/'+Date.now()+'.png'; 

        let buffer = Buffer.from(body.image.split(',')[1], 'base64');        
        fs.writeFileSync(path.join(__dirname, imagepath), buffer);  



        const productRecord = new Product({
            name: body.name,
            description: body.description,
            image: imagepath,
            amount:body.amount
        });
        const product = await productRecord.save();
        return res.status(200).json({
            success: 1,
            data: product
        });
    }catch(e){
        
        return res.status(404).json({
            success: 0,
            msg: e
        })
    }
}

const getProduct = async (req, res) => {

    try{
        const product = await Product.find();
        return res.status(200).json({
            success: 1,
            data: product
        }) 
    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        }) 
    }
}

const getProductById = async (req, res) => {
   
    try{
        const product = await Product.findOne({_id: new mongoose.Types.ObjectId(req.params.id)});
        return res.status(200).json({
            success: 1,
            data: product
        }) 
    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        }) 
    }
}


const updateProductById = async(req, res) =>{

    const body = req.body;
   
    try{       
        if(body.image){
            let filePath = '../../images';
            var imagename = Date.now()+'.png';       
            const imagepath = filePath+'/'+Date.now()+'.png'; 

            let buffer = Buffer.from(body.image.split(',')[1], 'base64');        
            fs.writeFileSync(path.join(__dirname, imagepath), buffer);  
            $jsonData = {
                name: body.name,
                description: body.description,
                image: imagepath,
                amount:body.amount
            }
        }else{
            $jsonData = {
                name: body.name,
                description: body.description,
                amount:body.amount
            }
        }

            const product = await Product.updateOne({_id: new mongoose.Types.ObjectId(body.id)}, $jsonData);
        
           
       
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


// userId, ProductId, quantities, unitAmount, totalAmount



const deleteByProductId = async (req, res)=>{
    try{
        const product = await Product.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)});
        return res.status(200).json({
            success: 1,
            data: "Data deleted"
        }) 
    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        }) 
    }
}


module.exports = {
    createProduct: createProduct,
    getProduct: getProduct,
    getProductById: getProductById,
    updateProductById: updateProductById,
    deleteByProductId:deleteByProductId
}