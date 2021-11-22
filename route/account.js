var express = require('express')
var router = express.Router()
var controler = require('../controller/con_user')
var validate = require('../controller/validate')

router.get('/get_account',
    controler.get_account(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
),
    router.get('/get_account_user',
        controler.get_account_user(),
        (req, res) => {
            res.status(200).json({
                success: true,
                result: req.result
                
            })
        }
    ),

    router.get('/image/:id',
        (req, res) => {
            require("fs").readFile(__dirname.replace("route", "") + 'image/account/' + req.params.id, (err, data) => {
                if (err !== null) {
                    res.sendFile(__dirname.replace("route", "") + 'image/img_defult.png')
                } else {
                    res.sendFile(__dirname.replace("route", "") + 'image/account/' + req.params.id)
                }

            })
        }
    )

module.exports = router