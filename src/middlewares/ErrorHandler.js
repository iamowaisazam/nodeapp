const ErrorHandler = (err,req,res,next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {

        case 400:
            res.json({
                title:"Validation Error",
                message:err.message,
                stack:err.stack
            });
            break;

        case 401:
            res.json({
                title:"Forbiden Error",
                message:err.message,
                stack:err.stack
            });
            break;


        case 401:
            res.json({
                title:"UnAuthorized",
                message:err.message,
                stack:err.stack
            });
            break;    
        
        case 500:
        res.json({
            title:"Server Error",
            message:err.message,
            stack:err.stack
        });
        break;  

        default:
            console.log("All Good");
            break;
    }
    
    
    


    // next()
}


module.exports = ErrorHandler