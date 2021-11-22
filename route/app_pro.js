var express = require('express')
var router=express.Router()
var app_controlor = require('../controller/app_pro_controlor')




router.get('/img_promotiotion_app',
    app_controlor.img_promotiotion_app(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            result:req.result
        })
    }
),


router.get('/get_all_promotion_app',
    app_controlor.get_all_promotion_app(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            result:req.result
        })
    }
),

router.post('/get_promotion_app',
    app_controlor.get_promotion_app(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            result:req.result
        })
    }
),

module.exports=router
