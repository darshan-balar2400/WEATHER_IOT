require("dotenv").config({path: "Config/dev.env"});
const server = require("./app");
const ErrorHandler = require("./Utils/ErrorHandler.js");

let port = process.env.PORT;

// uncaughtException handling
process.on("uncaughtException", (err) => {
    console.log(err.message);
    process.exit(1);
});

server.listen(port,"localhost",(err) => {
    if(err){
        throw new ErrorHandler("Couldn't listen on port",500);
    }

    console.log(`Listening on port ${port}`);
});

// unhandledRejection Error Handling
process.on('unhandledRejection', (err) => {
    console.log(err.message);
    server.close(() => {
        process.exit(1);
    });
});