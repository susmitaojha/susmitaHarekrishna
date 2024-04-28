const User = require("./user.service");
const { genSaltSync, hashSync, compareSync} = require('bcrypt');
const mongoose = require("mongoose");
const { sign } = require("jsonwebtoken");


const createUser = async (req, res) => {

    const body = req.body;
        try{
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        
        const checkEmail = await User.find({email: body.email}).count();
      
        if(checkEmail > 0){
            return res.status(404).json({
                success: 0,
                msg: "Email already exists!"
            })
        }

        const userRecord = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            mobileNo: body.mobileNo
        });
    
        const user = await userRecord.save();
        
        return res.status(200).json({
            success: 1,
            data: user
        })
    }catch(e){
        
        return res.status(404).json({
            success: 0,
            msg: e
        })
    }
    



}

const getUser = async (req, res) => {
    try{
        const user = await User.find();
        return res.status(200).json({
            success: 1,
            data: user
        }) 
    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        }) 
    }
}



const getUserById = async (req, res) => {

    try{
        const user = await User.findOne({_id: new mongoose.Types.ObjectId(req.params.id)});
        return res.status(200).json({
            success: 1,
            data: user
        }) 
    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        }) 
    }
}


const updateUserById = async (req, res)=>{
    const body = req.body;
   
    try{      
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        const checkEmail = await User.find({email: body.email, _id: {$ne:new mongoose.Types.ObjectId(body.id)}}).count();
      
        if(checkEmail > 0){
            return res.status(404).json({
                success: 0,
                msg: "Email already exists!"
            })
        }
 
            $jsonData = {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: body.password,
                mobileNo: body.mobileNo
            }
         
            const product = await User.updateOne({_id: new mongoose.Types.ObjectId(req.params.id)}, $jsonData);
        
           
       
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

const deleteByUserId = async (req, res)=>{
    try{
        const user = await User.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)});
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

const login = async (req, res) => {
    const body = req.body;
    try{
        const user = await User.findOne({email:body.email})
        if(user){
            const encryresult = compareSync(body.password, user.password);   
            if(encryresult === true){

                const jsontoken = sign({result: user}, 'susmita', {
                    expiresIn: "1h"
                });

                return res.status(200).json({
                    success: 1,
                    data: user,
                    token_code: jsontoken
                })

            }else{
                return res.status(404).json({
                    success: 0,
                    msg: "Password does not match"
                }) 
            }
            

        }

    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        })
    }
}


module.exports = {
    createUser: createUser,
    getUser: getUser,
    getUserById: getUserById,
    updateUserById: updateUserById,
    deleteByUserId: deleteByUserId,
    login: login
}