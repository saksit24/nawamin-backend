var errorMessage = require('../const/error_message')
var constanc = require('../const/constance')
var jsonwebToken = require('jsonwebtoken')

exports.validate_add_product=()=>{
    return(req,res,next)=>{
        if(req.body.name_product&&
            req.body.price_product&&
            req.body.capital_price_product&&
            req.body.type_product&&
            req.body.stock_product&&
            req.body.code_product&&
            req.body.image_product)
            {
                next();
            }
        else{
            res.status(200).json(errorMessage.invalid_data)
        }
    }
}

exports.validate_update_prpduct=()=>{
    return(req,res,next)=>{
        if(req.body.code_product&&
            req.body.name_product&&
            req.body.price_product&&
            req.body.capital_price_product&&
            req.body.type_product&&
            req.body.stock_product&&
            req.body.image_peoduct){
                next()
            }
        else{
            res.status(200).json(errorMessage.invalid_data)
        }
    }
}