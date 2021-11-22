var db = require('../connect/db_connect')
var encrypt = require('../const/encrypt')
var bcrypt = require('bcryptjs')
var jsonwebToken = require('jsonwebtoken')
var testfile = 'testfile.txt'
var error_message = require('../const/error_message')
var fs = require('fs')
var nodemailer = require('nodemailer');

// setup mail transporter service
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saksit2441@gmail.com', // your email
        pass: 'Skies241040'              // your password
    }
});


exports.add_promotion = () => {
    return (req, res, next) => {

        var data = {
            id_promotion: null,
            name_promotion: req.body.name_promotion,
            detail_promotion: req.body.detail_promotion,
            date_promotion: new Date()
            // image_promotion: `promotion/image/promotion_${req.body.id_promotion}.png`
        }
        console.log(data)
        db.query('INSERT INTO promotion SET ? ', data, (err, result) => {
            if (err) throw err;
            fs.writeFile(`./image/promotion/promotion_${result.insertId}.png`, req.body.image_promotion.slice(23), 'base64', (err, data) => {
                // db.query('UPDATE INTO detail_promotion SET ? ', data, 
                let image_promotion = 'promotion/image/promotion_' + result.insertId + '.png'
                db.query('UPDATE promotion SET image_promotion=? WHERE id_promotion = ?', [image_promotion, result.insertId], (err, result2) => {
                    console.log('re', result.insertId)
                    if (err) throw err;
                    if (result) {
                        db.query('SELECT email FROM user_login WHERE user_type="3"', (err, result_e) => {
                            if (err) throw err
                            if (result_e) {
                                result_e.map((element) => {
                                    console.log('hche', element)
                                    let mailOptions = {
                                        from: "saksit2441@gmail.com",
                                        to: element.email,
                                        subject: `โปรโมชั่นใหม่ของทางร้าน: `+req.body.name_promotion,
                                        text: `รายละเอียด :` + req.body.detail_promotion
                                    };
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) throw error;
                                        else {
                                            console.log("Email successfully sent!");
                                            next()
                                        }
                                    });

                                })
                            }
                        })
                    }
                })
                if (err) throw err;

            })

        })
    }
}

exports.get_promotion = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM promotion'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.delete_promotion = () => {
    return (req, res, next) => {
        db.query('DELETE FROM promotion WHERE id_promotion = ?', req.body.id_promotion, (err, result) => {
            if (err) throw err;
            else {
                fs.unlink(`./image/promotion/promotion_${req.body.id_promotion}.png`, (err) => {
                    if (err) throw err;
                });
                req.result = result
                next()
            }
        })
    }
}

exports.get_promotion_update = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM promotion WHERE id_promotion = ?'
        db.query(sql, req.body.id_promotion, (err, result) => {
            console.log('s', result[0])
            if (err) throw err;
            else {

                req.result = result[0]
                next()
            }
        })
    }
}


exports.update_promotion = () => {
    return (req, res, next) => {
        console.log('ss', req.body)
        let update_promotion = {
            name_promotion: req.body.name_promotion,
            detail_promotion: req.body.detail_promotion,
            // image_promotion: 'promotion/image/promotion_'+req.body.id_promotion+'.png'
        }
        if (req.body.image_promotion === `promotion/image/promotion_${req.body.id_promotion}.png`) {
            console.log('yyyy', req.body.image_promotion)
            db.query('SELECT*FROM promotion WHERE id_promotion = ?', req.body.id_promotion, (err, result) => {
                if (err) throw err;
                if (result[0]) {
                    db.query('UPDATE promotion SET ? WHERE id_promotion = ?', [update_promotion, req.body.id_promotion], (err) => {
                        if (err) throw err;
                        req.result = result
                        console.log('อัพเดทข้อมูลสำเร็จ')
                        next()
                    })
                }
                else {
                    console.log('ไม่พบข้อมูลผู้มช้งาน')
                    res.status(200).json(error_message.err_update_not_found)
                }
            })

        }
        else {
            console.log('ooo', req.body.image_promotion)
            db.query('SELECT*FROM promotion WHERE id_promotion = ?', req.body.id_promotion, (err, result) => {
                if (err) throw err;
                if (result[0]) {

                    db.query('UPDATE promotion SET ? WHERE id_promotion = ?', [update_promotion, req.body.id_promotion], (err) => {
                        if (err) throw err;
                        else {
                            fs.writeFile(`./image/promotion/promotion_${req.body.id_promotion}.png`, req.body.image_promotion.slice(23), 'base64', (err, data) => {
                                if (err) throw err;
                                let image_promotion = 'promotion/image/promotion_' + req.body.id_promotion + '.png'
                                db.query('UPDATE promotion SET image_promotion=? WHERE id_promotion = ?', [image_promotion, req.body.id_promotion], (err, result) => {
                                    console.log('re', req.body.id_promotion)
                                    if (err) throw err;
                                    console.log('อัพเดทข้อมูลสำเร็จ')
                                    next()
                                })
                            })
                        }
                    })
                }
                else {
                    console.log('ไม่พบข้อมูลผู้มช้งาน')
                    res.status(200).json(error_message.err_update_not_found)
                }
            })
        }


    }
}