const { verify, decode, sign } = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) =>{
        let token = req.get("authorization");
     
        if(token){
            token = token.slice(7);
           
            verify(token, "susmita", (err, decoded) => {

                var refreshedToken = sign({
                    success: true,
                    }, 'assignment', {
                        expiresIn: '5m'
                    });
                    req.token_code = refreshedToken;
                if(err){
                    res.json({
                        success: 2,
                        message: 'invalid token'
                    });
                }else{                    
                    next();
                }
            });
        }else{
            res.json({
                success: 2,
                message: "Access denied!"
            })
        }
    }
}