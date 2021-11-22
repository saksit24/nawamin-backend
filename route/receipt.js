var express = require('express')
var router = express.Router()
var controler = require('../controller/con_product')
var validate = require('../controller/validate')

router.post('/detail_ex',
    controler.detail_ex(),
    (req, res) => {
        res.status(200).json({
            success: true,
            result: req.result
        })
    }
),

    router.get('/image/:id',
        (req, res) => {
            require("fs").readFile(__dirname.replace("route", "") + 'image/receipt/' + req.params.id, (err, data) => {
                if (err !== null) {
                    res.sendFile(__dirname.replace("route", "") + 'image/img_defult.png')
                } else {
                    res.sendFile(__dirname.replace("route", "") + 'image/receipt/' + req.params.id)

                }

            })
        }
    )

module.exports = router