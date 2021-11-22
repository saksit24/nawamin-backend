var express = require('express')
var router = express.Router()
var controler = require('../controller/control')
var validate = require('../controller/validate')

// var image = require ('../controller/image_control')



//ลองเขียนไฟล์
router.post('/new_file',
    controler.new_file(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'สร้างไฟล์สำเร็จ'
        })
    }
)

//ลองก็อปไฟล์
router.post('/cop_text',
    controler.cop_text(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'สร้างไฟล์ใหม่พร้อมเขียน'
        })
    }
)
//ลองอัพรูป
router.post('/upload_img',
    controler.upload_img(),
    (req, res) => {
        res.status(200).json({
            success: true,

        })
    }
)
//ลองอ่านรูป
router.post('/read_img',
    controler.cop_img(),
    (req, res) => {
        res.status(200).json({
            success: true,
            // result:req.result,
            result2: req.result2
        })
    }
)


//ลองอ่านไฟล์
router.post('/read_file',
    controler.read_file(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)
//แสดงยูสเซอร์ทั้งหมด หน้าตรวจสอบสมาชิก
router.get('/show_user',
    controler.show_user(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
),

    //แสดงข้อมูลส่วนตัว หน้าอัพเดทข้อมูลส่วนตัว
    router.post('/user_valid',
        validate.validate_token(),
        controler.user_valid(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    //แสดงข้อมูลส่วนตัว หน้าข้อมูลส่วนตัว
    router.get('/user_valid',
        validate.validate_token(),
        controler.user_valid(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    //แสดงข้อมูลส่วนตัว หน้าตรวจสอบข้อมูลส่วนตัวของสมาชิก
    router.post('/user_person',
        validate.validate_token(),
        controler.user_person(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    //ดึงข้อมูลเก่ามาอัพเดท หน้าอัพเดทยูสเซอร์
    router.post('/get_user_update',
        validate.validate_token(),
        controler.get_user_update(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    //อัพเดทข้อมูลส่วนตัว หน้าอัพเดทข้อมูลส่วนตัว
    router.post('/update_user',
        // validate.validate_update_user_data(),
        validate.validate_token(),
        controler.update_user(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'อัพเดทได้แล้ว'
            })
        }
    ),

    //อัพเดทข้อมูลส่วนตัว หน้าอัพเดทยูสเซอร์
    router.post('/update_user_person',
        validate.validate_token(),
        controler.update_user_person(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'อัพเดทได้แล้ว'
            })
        }
    ),

    //แก้ไขรหัสผ่าน หน้าข้อมูลส่วนตัว
    router.post('/update_password',
        validate.validate_update_password(),
        validate.validate_token(),
        controler.update_password(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'เปลี่ยนรหัสผ่านสำเร็จ'
            })
        }
    ),

    //ล็อคอินเข้าเว็บ
    router.post('/user_login',
        validate.validate_user_login(),
        controler.login(),
        (req, res) => {
            res.status(200).json({
                success: true,
                token: req.token,
                message: 'เข้าใช้งานสำเร็จ'
            })
        }
    ),

    //สมัครสมาชิก
    router.post('/register',
        validate.validate_user_register(),
        controler.add_register(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'สมัครสมาชิกสำเร็จ'
            })
        }
    ),

    router.post('/get_access',
        controler.get_access(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    )

// router.get('/image/:id',
//     (req,res)=>{
//         require("fs").readFile(__dirname.replace("route", "") + 'image/user/' + req.params.id, (err, data) => {

//             if(err!==null){
//                 res.sendFile(__dirname.replace("route", "") + 'image/promotion_defult.png')
//             }else{
//             res.sendFile(__dirname.replace("route", "") + 'image/user/' + req.params.id)
//             }

//         })
//     }
// )

module.exports = router