var express = require('express')
var router=express.Router()
var promotion_controlor = require('../controller/promotion_controlor')
var validate = require('../controller/promotion_validate')


router.post('/add_promotion',
    // validate.validate_add_promotion(),
    promotion_controlor.add_promotion(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            // message:'เพิ่มสินค้าสำเร็จ'
        })
    }
),

router.get('/get_promotion',
    promotion_controlor.get_promotion(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            result:req.result
        })
    }
),

router.post('/delete_promotion',
    promotion_controlor.delete_promotion(),
    (req,res) => {
        res.status(200).json({
            success:true,
            message:'ลบโปรโมชั่นสำเร็จ',
        })
    }
),

router.post('/get_promotion_update',
    promotion_controlor.get_promotion_update(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            result:req.result
        })
    }
),

router.post('/update_promotion',
    // validate.validate_update_prpduct(),
    promotion_controlor.update_promotion(),
    
    (req,res)=>{
        res.status(200).json({
            success:true,
            message:'อัพเดทสำเร็จ'
        })
    }
),



router.get('/image/:id',
    (req,res)=>{
        require("fs").readFile(__dirname.replace("route", "") + 'image/promotion/' + req.params.id, (err, data) => {
            if(err!==null){
                res.sendFile(__dirname.replace("route", "") + 'image/promotion_defult.png')
            }else{
            res.sendFile(__dirname.replace("route", "") + 'image/promotion/' + req.params.id)
            }

        })
    }
)

module.exports=router