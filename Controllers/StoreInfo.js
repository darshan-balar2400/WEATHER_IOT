const CatchAsyncError = require("../Utils/CatchAsyncError");
const InfoModel = require("../Models/Info");
const ErrorHandler = require("../Utils/ErrorHandler");
const AddInfo = CatchAsyncError(async(req,res,next) => {

    let data = req.body;

    console.log(data);

    let obj = {
    }

    if(req.body.temp){
        obj.temp = Number(req.body.temp);
    }

    if(req.body.humidity){
        obj.humidity = Number(req.body.humidity);
    }

    if(req.body.aqi){
        obj.aqi = Number(req.body.aqi);
    }

    if(req.body.status){
        obj.status = req.body.status;
    }

    if(data == undefined || Object.keys(data).length <= 0){
        return next(new ErrorHandler("Please Enter Data",404));
    }

    let newData = await InfoModel.findByIdAndUpdate({_id:"6618b2fb91bf5a1ac17aae48"},obj,{new:true});

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