var express = require('express')
var router = express.Router()
var controlor = require('../controller/course_con')
var validateUtil = require('../controller/validate')

router.get('/get_all',
    controlor.get_all(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
),

    router.get('/all_course',
        controlor.all_course(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.get('/get_user_book',
        validateUtil.validate_token(),
        controlor.get_user_book(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),


    router.post('/book',
        validateUtil.validate_token(),
        controlor.book(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'จองเทรนเนอร์สำเร็จ !'
            })
        }
    ),

    router.post('/main',
        controlor.validate_main(),
        controlor.main(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'เพิ่มคอร์สสำเร็จ !'
            })
        }
    ),

    router.post('/sup',
        controlor.sup(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'เพิ่มคอร์สสำเร็จ !'
            })
        }
    ),

    router.post('/delete_course',
        controlor.delete_course(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'ลบคอร์สสำเร็จ',
            })
        }
    ),

    router.post('/get_main_update',
        controlor.get_main_update(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.post('/update_main',
        controlor.update_main(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'อัพเดทสำเร็จ'
            })
        }
    ),



    module.exports = router