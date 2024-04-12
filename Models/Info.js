const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    temp:{
        type:Number
    },
    humidity:{
        type:Number
    },
    aqi:{
        type:Number
    },
    status:{
        type:String
    }
});

const InfoModel = new mongoose.model("infos",InfoSchema);

module.exports = InfoModel;