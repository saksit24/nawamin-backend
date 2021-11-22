var express = require('express')
var router = express.Router()
var controler = require('../controller/con_user')
var validate = require('../controller/validate')


//สมัครสมาชิก
router.post('/register',
    validate.validate_update_user_data(),
    controler.register(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'สมัครสมาชิกสำเร็จ'
        })
    }
),

    //เพิ่มแอดมิน
    router.post('/register_admin',
        validate.validate_update_user_data(),
        controler.register_admin(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'เพิ่มบีญชีผู้ใช้แอดมินสำเร็จ'
            })
        }
    ),

    //ลงชื่อเข้าใช้งาน
    router.post('/login',
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
    //เรียกดูข้อมูลส่วนตัว
    router.get('/profile',
        validate.validate_token(),
        controler.profile(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.post('/add_account',
        controler.add_account(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'เพิ่มบัญชีธนาคารสำเร็จ'
            })
        }
    ),

    router.post('/update_account',
        controler.update_account(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'อัพเดทบัญชีธนาคารสำเร็จ'
            })
        }
    ),
    router.post('/get_update_account',
        controler.get_update_account(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    ),

    router.post('/delete_account',
        controler.delete_account(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'ลบบัญชีธนาคารสำเร็จ',
            })
        }
    ),


    router.get('/get_account',
        controler.get_account(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result,
            })
        }
    ),

    //อัพเดทข้อมูลส่วนตัว หน้าอัพเดทข้อมูลส่วนตัว
    router.post('/update_user',
        validate.validate_token(),
        controler.update_user(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'อัพเดทได้แล้ว'
            })
        }
    ),

    //แก้ไขรหัสผ่าน
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




    // //อัพเดทข้อมูลส่วนตัว หน้าอัพเดทยูสเซอร์
    // router.post('/update_user_person',  
    //     validate.validate_token(),
    //     controler.update_user_person(),
    //     (req,res)=>{
    //         res.status(200).json({
    //             success:true,
    //             message:'อัพเดทได้แล้ว'
    //         })
    //     }
    // ),

    // //แก้ไขรหัสผ่าน หน้าข้อมูลส่วนตัว
    // router.post('/update_password',
    //     validate.validate_update_password(),
    //     validate.validate_token(),
    //     controler.update_password(),
    //     (req,res)=>{
    //         res.status(200).json({
    //             success:true,
    //             message:'เปลี่ยนรหัสผ่านสำเร็จ'
    //         })
    //     }
    // ),

    // //ล็อคอินเข้าเว็บ
    // router.post('/user_login',
    //     validate.validate_user_login(),
    //     controler.login(),
    //     (req,res)=>{
    //         res.status(200).json({
    //             success:true,
    //             token:req.token,
    //             message:'เข้าใช้งานสำเร็จ'
    //         })
    //     }
    // ),


    router.get('/image/:id',
        (req, res) => {
            require("fs").readFile(__dirname.replace("route", "") + 'image/user/' + req.params.id, (err, data) => {

                if (err !== null) {
                    res.sendFile(__dirname.replace("route", "") + 'image/img_defult.png')
                } else {
                    res.sendFile(__dirname.replace("route", "") + 'image/user/' + req.params.id)
                }

            })
        }
    )

module.exports = router