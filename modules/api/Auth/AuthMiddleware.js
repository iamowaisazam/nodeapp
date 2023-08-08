const jwt = require('jsonwebtoken');
const User = require('../../../models/User');


// 
// 
//@route api/v1/register
const isLoggedIn = async (req,res,next) => {

        if(!req.headers.authorization){
            return res.status(400).json({
                message:"Token Not Found",
            });
        }

        const findBearer = req.headers.authorization.split(" ")[0];
        if(findBearer != "Bearer"){
            return res.status(400).json({
                message:"Token Not Found",
            });
        }

        const findtoken = req.headers.authorization.split(" ")[1];
        if(!findtoken){
            return res.status(400).json({
                message:"Token Not Found",
            });
        }

        try {

            let decryptToken = await jwt.verify(findtoken, process.env.TOKEN_KEY);
            let id = decryptToken.user_id;
            const response = await User.findOne({where:{id:id}});
            if(response == null){
                return res.status(400).json({
                    message:"Invlaid Not Found",
                });
            }

            req.user = response;
            next();

        } catch (error) {
            return res.status(400).json({
                message:"Invlaid Not Found",
            });
        }
       
}





module.exports = {
    isLoggedIn
}
