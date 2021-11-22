var express = require('express')
var router = express.Router()
var product_controlor = require('../controller/product_controlor')
var validate = require('../controller/product_validate')
var validate_token = require('../controller/validate')

// router.post('/show_product',
//     controler.show_product(),
//     (req,res)=>{
//         res.status(200).json({
//             success:true,
//             result:req.result
//         })
//     }
// ),
router.get('/get_product',
    product_controlor.get_product(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.get('/get_product_sell',
    product_controlor.get_product_sell(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.get('/get_course_sell',
    product_controlor.get_course_sell(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)


router.post('/get_product_update',
    product_controlor.get_product_update(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.post('/add_product',
    validate.validate_add_product(),
    product_controlor.add_product(),
    (req, res) => {
        res.status(200).json({
            success: true,
            // message:'เพิ่มสินค้าสำเร็จ'
        })
    }
),

    router.post('/delete_product',
        product_controlor.delete_product(),
        (req, res) => {
            res.status(200).json({
                success: true,
                message: 'ลบสินค้าสำเร็จ',
            })
        }
    ),


    router.post('/get_slip_product',
        product_controlor.get_slip_product(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
            })
        }
    )


router.post('/check_personal_id',
    product_controlor.check_personal_id(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.post('/get_detail_slip',
    product_controlor.get_detail_slip(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.get('/get_slip',
    product_controlor.get_slip(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.post('/update_product',
    // validate.validate_update_prpduct(),
    product_controlor.update_product(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'อัพเดทสำเร็จ'
        })
    }
)

router.post('/slip_course',
    validate_token.validate_token(),
    product_controlor.slip_course(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'เพิ่มใบเสร็จคอร์ส'
        })
    }
)

router.post('/slip_product',
    validate_token.validate_token(),
    product_controlor.slip_product(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'เพิ่มใบเสร็จสินค้า'
        })
    }
)

router.post('/add_income',
    product_controlor.add_income(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'เพิ่มรายรับ-รายจ่ายสำเร็จ'
        })
    }
)

router.get('/get_income',
    product_controlor.get_income(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.get('/income_get',
    product_controlor.income_get(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.get('/income_pay',
    product_controlor.income_pay(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.post('/get_up_income',
    product_controlor.get_up_income(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)

router.get('/detail_income',
    product_controlor.detail_income(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    })



router.post('/income',
    product_controlor.income(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
)
router.post('/add_product_course',
    product_controlor.add_product_course(),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'เพิ่มคอร์สสำเร็จ'
        })
    }
)



router.get('/image/:id',
    (req, res) => {
        require("fs").readFile(__dirname.replace("route", "") + 'image/product/' + req.params.id, (err, data) => {

            if (err !== null) {
                res.sendFile(__dirname.replace("route", "") + 'image/product_defult.png')
            } else {
                res.sendFile(__dirname.replace("route", "") + 'image/product/' + req.params.id)
            }

        })
    }
)

// router.get('/image/:id',
//     function (req, res) {

//         require("fs").readFile(__dirname.replace("route", "") + 'image/product/' + req.params.id, (err, data) => {

//             if(err!==null){
//                 res.sendFile(__dirname.replace("route", "") + 'image/default_product.png')
//             }else{
//             res.sendFile(__dirname.replace("route", "") + 'image/product/' + req.params.id)
//             }

//         })

//     })

module.exports = router