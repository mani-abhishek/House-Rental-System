const mongoose = require("mongoose")

exports.isValid_id = (id) =>{
    if( !mongoose.Types.ObjectId.isValid(id) ) return false;
}


class ErrorHander extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

module.exports = ErrorHander