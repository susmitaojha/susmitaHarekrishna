const Employee = require("./employee.service");
const mongoose = require('mongoose');

const createEmployee = async (req, res) => {

    const body = req.body;
    try{

        const employeeRecord = new Employee({
            firstName: body.firstName,
            lastName: body.lastName,
            mobileNo: body.mobileNo
        });
    
        const user = await employeeRecord.save();
        
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

const getEmployee = async (req, res) => {

    try{
        const employee = await Employee.find();
        return res.status(200).json({
            success: 1,
            data: employee
        }) 
    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        }) 
    }
}



const getEmployeeById = async (req, res) => {
    try{
        const employee = await Employee.findOne({_id: req.params.id});
        return res.status(200).json({
            success: 1,
            data: employee
        }) 
    }catch(e){
        return res.status(404).json({
            success: 0,
            msg: e
        }) 
    }
}


const updateEmployeeById = async (req, res)=>{
    const body = req.body;
    try{
        const employee = await Employee.updateOne({_id:  new mongoose.Types.ObjectId(body.id)},{
            firstName: body.firstName,
            lastName: body.lastName,
            mobileNo: body.mobileNo
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

const deleteByEmployeeId = async (req, res)=>{
    try{
        const employee = await Employee.deleteOne({_id: new mongoose.Types.ObjectId(req.params.id)});
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
    createEmployee: createEmployee,
    getEmployee: getEmployee,
    getEmployeeById: getEmployeeById,
    updateEmployeeById: updateEmployeeById,
    deleteByEmployeeId: deleteByEmployeeId
}