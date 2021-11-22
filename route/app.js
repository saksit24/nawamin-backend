var express = require('express')
var router = express.Router()
var controlor = require('../controller/app')
var validateUtil = require('../controller/validate')



router.post('/add_gym',
    controlor.validate_add_gym(),
    controlor.add_gym(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'เพิ่มข้อมูลยิมสำเร็จ !'
        })
    }
),


    router.get('/get_gym',
        controlor.get_gym(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),


    router.get('/notification_book',
        controlor.notification_book(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.get('/notification_mem',
        controlor.notification_mem(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),


    router.get('/check_payment',
        controlor.check_payment(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),



    router.post('/get_book',
        // validateUtil.validate_token(),
        controlor.get_book(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.post('/add_account',
        controlor.add_account(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'เพิ่มบัญชีธนาคารสำเร็จ'
            })
        }
    ),

    router.post('/update_account',
        controlor.update_account(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'อัพเดทบัญชีธนาคารสำเร็จ'
            })
        }
    )


router.post('/add_status',
    controlor.add_status(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'เปลี่ยนสถานะ!'
        })
    }
)

router.post('/add_status_payment',
    controlor.add_status_payment(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'ยืนยันหลักฐานแล้ว'
        })
    }
)


router.get('/show_account',
    validateUtil.validate_token(),
    controlor.show_account(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    })


router.post('/get_update_account',
    controlor.get_update_account(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    })

router.post('/delete_account',
    controlor.delete_account(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'ลบบัญชีธนาคารสำเร็จ',
        })
    }
),

    router.post('/get_accept_detail',
        controlor.get_accept_detail(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    )
router.post('/get_accept',
    controlor.get_accept(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)


router.post('/get_payment_detail',
    controlor.get_payment_detail(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)
router.post('/get_payment',
    controlor.get_payment(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.post('/add_img_payment',
    controlor.add_img_payment(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'เพิ่มสลิปสำเร็จ',
        })
    }
),

    router.post('/delete_request',
        controlor.delete_request(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'ลบคำขอแล้ว',
            })
        }
    ),



    router.post('/get_account',
        controlor.get_account(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result,
            })
        }
    ),





    router.get('/image/:id',
        (req, res) => {
            require("fs").readFile(__dirname.replace("route", "") + 'image/payment/' + req.params.id, (err, data) => {

                if (err !== null) {
                    res.sendFile(__dirname.replace("route", "") + 'image/product_defult.png')
                } else {
                    res.sendFile(__dirname.replace("route", "") + 'image/payment/' + req.params.id)
                }

            })
        }
    )



module.exports = router