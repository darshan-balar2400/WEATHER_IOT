const CatchAsynError = (f) => {
    return (req,res,next) => {
        Promise.resolve(f(req,res,next)).catch((err) => next(err));
    }
}

module.exports = CatchAsynError;