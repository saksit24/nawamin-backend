var errorMessage = require('../const/error_message')
var constanc = require('../const/constance')
var jsonwebToken = require('jsonwebtoken')

exports.validate_user_register=()=>{
    return(req,res,next)=>{
        if(req.body.user&&
            req.body.name&&
            req.body.user_type&&
            req.body.last_name&&
            req.body.password&&
            req.body.email&&
            req.body.phone_number&&
            req.body.address&&
            req.body.name_eng&&
            req.body.last_name_eng&&
            req.body.dob&&
            req.body.gender&&
            req.body.personal_id){
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

exports.validate_update_user_data=()=>{
    return(req,res,next)=>{
        if(req.body.user&&
            req.body.name&&
            req.body.last_name&&
            req.body.email&&
            req.body.phone_number&&
            req.body.address){
                next()
            }
        else{
            res.status(200).json(errorMessage.invalid_data)
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

exports.validate_token = ()=>{
    return (req,res,next)=>{
        // console.log('GG',req.headers.authorization)
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
                    console.log('GG',decode)
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