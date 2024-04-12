const CatchAsyncError = require("../Utils/catchAsyncError");
const InfoModel = require("../Models/Info");
const ErrorHandler = require("../Utils/ErrorHandler");
const AddInfo = CatchAsyncError(async(req,res,next) => {

    let data = req.body;

    console.log(data);

    if(data == undefined || Object.keys(data).length <= 0){
        return next(new ErrorHandler("Please Enter Data",404));
    }

    let newData = await InfoModel.findByIdAndUpdate({_id:"6618b2fb91bf5a1ac17aae48"},req.body,{new:true});

    res.status(200).send({
        success:true,
        data:newData
    });
});

const GetInfo = CatchAsyncError(async(req,res,next) => {

    let data = await InfoModel.findById({_id:"6618b2fb91bf5a1ac17aae48"});

    if(!data){
        return next(new ErrorHandler("No Data found!",404));
    }

    res.status(200).send({
        success:true,
        data
    });
});

module.exports = {
    AddInfo,
    GetInfo
}