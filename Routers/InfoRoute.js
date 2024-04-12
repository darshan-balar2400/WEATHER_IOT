const express = require("express");
const route = express.Router();

const {AddInfo,GetInfo} = require("../Controllers/StoreInfo");

route.post("/send",AddInfo);
route.get("/get",GetInfo)

module.exports = route;