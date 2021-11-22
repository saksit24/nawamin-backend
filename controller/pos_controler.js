var db = require('../connect/db_connect')
var encrypt = require('../const/encrypt')
var bcrypt = require('bcryptjs')
var jsonwebToken = require('jsonwebtoken')
var testfile = 'testfile.txt'
var error_message = require('../const/error_message')
var fs = require('fs')


exports.writehex = () => {
    return (req, res, next) => {
        fs.writeFile(`./image/product/test.png`, req.body.image_hex, 'hex', (err, data) => {
            if (err) throw err;
            next()
        })
    }
}

exports.register = () => {
    return (req, res, next) => {
        var data = {
            user: req.body.user,
            name: req.body.name,
            last_name: req.body.last_name,
            password: encrypt.encrypt(req.body.password),
            email: req.body.email,
            address: req.body.address,
            phone_number: req.body.phone_number,
            user_type: req.body.user_type,
            personal_id: req.body.personal_id,
            name_eng: req.body.name_eng,
            last_name_eng: req.body.last_name_eng,
            dob: req.body.dob,
            gender: req.body.gender,
            finger_print: req.body.finger_print,
            date: new Date()
        }

        console.log('finger', req.body)
        db.query('INSERT INTO user_login SET ?', data, (err, result) => {

            if (err) {
                console.log('error ocurred');
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('User Not');
                    res.status(200).json({
                        'Success': false,
                        'error_message': 'บัญชีนี้มีผู้ใช้งานแล้ว'
                    })
                }
                else
                    throw err;
            }

            else {
                if (req.body.user_type == '4') {
                    fs.writeFile(`./image/user/user_${result.insertId}.png`, req.body.image_profile, 'hex', (err, data) => {
                        if (err) throw err;
                        let image_profile = 'user_app/image/user_' + result.insertId + '.png'
                        db.query('UPDATE user_login SET image_profile=? WHERE user_id = ?', [image_profile, result.insertId], (err, result_img) => {
                            console.log('re1111', result.insertId)
                            if (err) throw err;
                            db.query('INSERT INTO trainer_book SET user_id = ?', result.insertId, (err, result_book) => {
                                if (err) throw err;
                                next()
                            })
                        })
                    })
                } else if (req.body.user_type == '3') {
                    fs.writeFile(`./image/user/user_${result.insertId}.png`, req.body.image_profile, 'hex', (err, data) => {
                        if (err) throw err;
                        let image_profile = 'user_app/image/user_' + result.insertId + '.png'
                        db.query('UPDATE user_login SET image_profile=? WHERE user_id = ?', [image_profile, result.insertId], (err, result_img) => {
                            console.log('re1111', result.insertId)
                            if (err) throw err;
                            db.query('INSERT INTO member SET user_id = ?, personal_id = ?', result.insertId, req.body.personal_id, (err, result_mem) => {
                                if (err) throw err;
                                next()
                            })
                        })
                    })
                } else {
                    fs.writeFile(`./image/user/user_${result.insertId}.png`, req.body.image_profile, 'hex', (err, data) => {
                        if (err) throw err;
                        let image_profile = 'user_app/image/user_' + result.insertId + '.png'
                        db.query('UPDATE user_login SET image_profile=? WHERE user_id = ?', [image_profile, result.insertId], (err, result_img) => {
                            console.log('re', result.insertId)
                            if (err) throw err;
                            next()
                        })
                    })
                }
            }

        })
    }
}





exports.update_finger = () => {
    return (req, res, next) => {
        let update_data = {
            finger_print: req.body.finger_print,
        }
        // console.log('update',req.body)
        db.query('SELECT * FROM user_login WHERE personal_id = ?', req.body.personal_id, (err, result) => {
            if (err) throw err
            // console.log('test',result)
            if (result[0]) {
                db.query('UPDATE user_login SET finger_print=? WHERE personal_id = ?', [update_data.finger_print, req.body.personal_id], (err, result) => {
                    // console.log('re', req.body.id_product)
                    if (err) throw err;
                    console.log('อัพเดทข้อมูลสำเร็จ')
                    next()
                })



                // db.query('UPDATE user_login SET finger_print = ? WHERE personal_id = ?', [update_data, req.body.personal_id], (err, Setresult) => {
                //     if (err) throw err;
                //     else {
                //         req.result = Setresult
                //         console.log('chchchchc',Setresult)
                //         next()
                //     }
                // })
            }
            else {
                console.log('ไม่พบข้อมูลผู้ใช้งาน')
                res.status(200).json(error_message.err_update_not_found)
            }
        })

    }
}


exports.show_user = () => {
    return (req, res, next) => {
        let sql = 'SELECT user_id,finger_print FROM user_login '
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}


exports.user_using = () => {
    return (req, res, next) => {
        let sql = 'SELECT name,user_id FROM user_login WHERE user_id =?'
        console.log(req.body)
        db.query(sql, req.body.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                console.log(req.result)
                next()
            }
        })
    }
}


exports.user_access = () => {
    return (req, res, next) => {
        obj = {
            user_id: req.body.user_id,
            date: new Date(),
            time: new Date()
        }
        db.query('SELECT * FROM member WHERE user_id=?', req.body.user_id, (err, result) => {
            if (err) throw err
            if (result[0]) {
                if (result[0].status == 1) {
                    let data = {
                        amount: result[0].amount-1
                    }
                    if (data.amount >= 0) {
                        db.query('UPDATE member SET amount=? WHERE user_id=?', [data.amount, req.body.user_id], (err, result3) => {
                            if (err) throw err
                            if (result3) {
                                db.query('INSERT INTO user_access SET ?', obj, (err, result) => {
                                    if (err) throw err;
                                    next()
                                })
                            }
                        })
                    }
                    else {
                        res.status(200).json(error_message.err_amount_access_not)
                    }
                }
            } else {
                db.query('INSERT INTO user_access SET ?', obj, (err, result2) => {
                    if (err) throw err;
                    next()
                })
            }
        })

    }
}

exports.no_finger = () => {
    return (req, res, next) => {
        console.log(req.body)
        db.query('SELECT user_id FROM user_login WHERE personal_id=?', req.body.personal_id, (err, result) => {
            if (err) throw err
            if (result[0]) {
                obj = {
                    user_id: result[0].user_id,
                    date: new Date(),
                    time: new Date()
                }
                db.query('INSERT INTO user_access SET ?', obj, (err, result2) => {
                    if (err) throw err;
                    next()
                })
            }
            else
                res.status(200).json(error_message.user_work_not_found)
        })
    }
}

