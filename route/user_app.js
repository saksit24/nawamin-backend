var express = require('express')
var router = express.Router()
var controler = require('../controller/user_app')
var validate = require('../controller/user_app_validate')
var validateUtil = require('../controller/validate')


router.post('/app_login',
    validate.validate_user_login(),
    controler.app_login(),
    (req, res) => {
        res.status(200).json({
            success: true,
            token: req.token,
            message: 'เข้าใช้งานสำเร็จ'
        })
    }
),

    // router.get('/get_train',
    //     controler.get_train(),
    //     (req, res) => {
    //         res.status(200).json({
    //             success:true,
    //             result:req.result
    //         })
    //     }
    // ),


    router.get('/get_train',
        controler.get_train(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),


    router.post('/detail_train',
        controler.detail_train(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),
    
    router.get('/get_member',
    validateUtil.validate_token(),
    controler.get_member(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
),

    router.get('/get_user',
        validateUtil.validate_token(),
        controler.get_user(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.get('/get_user_update',
        validateUtil.validate_token(),
        controler.get_user_update(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.post('/update_user',
        // validateUtil.validate_token(),
        controler.update_user(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'อัพเดทข้อมูลส่วนตัวสำเร็จ'
            })
        }
    ),

    router.get('/get_trainer_book',
        validateUtil.validate_token(),
        controler.get_trainer_book(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.get('/get_book',
        validateUtil.validate_token(),
        controler.get_book(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),
    
    
    router.post('/trainer_book',
        controler.trainer_book(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'อัพเดทข้อมูลสำเร็จ'
            })
        }
    )


router.post('/update_password',
    validateUtil.validate_update_password(),
    validate.validate_token(),
    controler.update_password(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'เปลี่ยนรหัสผ่านสำเร็จ'
        })
    }
),

    router.get('/image/:id',
        (req, res) => {
            require("fs").readFile(__dirname.replace("route", "") + 'image/user/' + req.params.id, (err, data) => {

                if (err !== null) {
                    res.sendFile(__dirname.replace("route", "") + 'image/product_defult.png')
                } else {
                    res.sendFile(__dirname.replace("route", "") + 'image/user/' + req.params.id)
                }

            })
        }
    )

module.exports = router