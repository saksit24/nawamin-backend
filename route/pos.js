var express = require('express')
var router=express.Router()
var controler = require('../controller/pos_controler')
// var validate = require('../controller/product_validate')


router.post('/writehex',
    controler.writehex(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            message:'save flie hex !'
        })
    }
)


router.post('/register',
    controler.register(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            message:'สมัครสมาชิกสำเร็จ !'
        })
    }
)

router.post('/update_finger',
    controler.update_finger(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            message:'อัพเดทข้อมูลสำเร็จ !'
        })
    }
)


router.get('/show_user',
    controler.show_user(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            result:req.result
        })
    }
),

router.post('/user_using',
    controler.user_using(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            result:req.result
            
        })
    }
),


router.post('/user_access',
    controler.user_access(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            message:'เข้าใช้บริการแล้ว !'
        })
    }
)

router.post('/no_finger',
    controler.no_finger(),
    (req,res)=>{
        res.status(200).json({
            success:true,
            message:'เข้าใช้บริการแล้ว !'
        })
    }
)


module.exports=router