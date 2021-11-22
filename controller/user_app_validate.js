var errorMessage = require('../const/error_message')
var constanc = require('../const/constance')
var jsonwebToken = require('jsonwebtoken')

exports.validate_token = ()=>{
    return (req,res,next)=>{
        if(!Boolean(req.headers["authorization"])){
            res.status(200).json({
                success : false,
                message : errorMessage.err_required_token
            });
        }
        else{
            jsonwebToken.verify(
                req.headers.authorization,
                constanc.sign,
                (err,decode)=>{
                    if(err){
                        res.status(200).json(errorMessage.err_required_fingerprint_token)
                    }
                    else{
                        req.user_id=decode.id;
                        next()
                    }
                    
                }
            )
        }
    }
} 

exports.validate_user_login=()=>{
    return(req,res,next)=>{
        if(req.body.user&&
            req.body.password){
                next();
            }
        else{
            res.status(200).json(errorMessage.invalid_data)
        }
    }
}


exports.validate_update_password=()=>{
    return(req,res,next)=>{
        if(req.body.password&&
            req.body.new_password){
                next()
            }
        else{
            res.status(200).json(errorMessage.invalid_data)
        }
    }
}
