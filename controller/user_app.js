var db = require('../connect/db_connect')
var encrypt = require('../const/encrypt')
var bcrypt = require('bcryptjs')
var jsonwebToken = require('jsonwebtoken')
var testfile = 'testfile.txt'
var error_message = require('../const/error_message')
var fs = require('fs')
var multer = require('multer')




exports.app_login = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM `user_login` WHERE user= ?', req.body.user, (err, result) => {
            if (err) throw err;
                if(result[0].user_type=='3'||result[0].user_type=='4'){
                    if (result[0]) {
                        let password = result[0].password
                        if (bcrypt.compareSync(req.body.password, password)) {
                            req.token = jsonwebToken.sign({
                                id: result[0].user_id
                            }, 'secret')
                            next()
                        }
                        else
                            res.status(200).json(error_message.err_wrong_password)

                }else
                res.status(200).json(error_message.user_work_not_found)
            }
            else
            res.status(200).json(error_message.user_work_not_found)
                
        })
    }
}

exports.get_train = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM user_login WHERE user_type= "4"'
        db.query(sql, req.body.user_type, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}



exports.detail_train = () => {
    return (req, res, next) => {
        console.log('body',req.body)
        let sql = 'SELECT * FROM user_login WHERE user_id = ?'
        db.query(sql, req.body.user_id, (err, result) => {
           
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}


exports.get_user = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM user_login WHERE user_id=?'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.get_member = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM member WHERE user_id=?'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.get_user_update = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM user_login WHERE user_id=?'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.get_trainer_book = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM user_login WHERE user_id=?'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}


exports.get_book = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM trainer_book WHERE user_id=?'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}




exports.trainer_book = () => {
    return (req, res, next) => {
        let update_data = {
            // user: req.body.user,
            price_train: req.body.price_train,
            time1: req.body.time1,
            time2: req.body.time2,
            time3: req.body.time3,
            time4: req.body.time4,
            time5: req.body.time5,
            time6: req.body.time6,
            time7: req.body.time7,
            time8: req.body.time8,
            time9: req.body.time9,
            time10: req.body.time10,
            time11: req.body.time11,
            time12: req.body.time12,
            time13: req.body.time13,
            time14: req.body.time14,
            time15: req.body.time15,
            time16: req.body.time16,
        }

    // console.log('id',req.body.user_id)
        db.query('SELECT * FROM trainer_book WHERE user_id = ?', req.body.user_id, (err, result) => {
            if (err) throw err
            console.log('reees',result)
            if (result[0]) {
                db.query('UPDATE trainer_book SET ? WHERE user_id = ?', [update_data, req.body.user_id], (err, Setresult) => {
                    if (err) throw err;
                    else {
                        req.result = Setresult
                        // console.log('ss',req.result)
                        console.log('อัพเดทสำเร็จ')
                        next()
                    }
                })
            }
            else {
                console.log('ไม่พบข้อมูลผู้ใช้งาน')
                res.status(200).json(error_message.err_update_not_found)
            }
        })

    }
}

exports.update_user = () => {
    return (req, res, next) => {
        // console.log('im',req.body.image_profile)
        let update_data = {
            user: req.body.user,
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            phone_number: req.body.phone_number,
            user_type: req.body.user_type,
            dob:req.body.dob,
            personal_id:req.body.personal_id,
            gender:req.body.gender,
            name_eng:req.body.name_eng,
            last_name_eng:req.body.last_name_eng,
        }
        if (req.body.image_profile === `user_app/image/user_${req.body.user_id}.png`) {
            console.log('yyyy', req.body.image_profile)
            db.query('SELECT * FROM user_login WHERE user_id = ?', req.body.user_id, (err, result) => {
                if (err) throw err
                if (result[0]) {
                    db.query('UPDATE user_login SET ? WHERE user_id = ?', [update_data, req.body.user_id], (err, Setresult) => {
                        if (err) throw err;
                        else {
                            req.result = Setresult
                            console.log('อัพเดทสำเร็จ')
                            next()
                        }
                    })
                }
                else {
                    console.log('ไม่พบข้อมูลผู้ใช้งาน')
                    res.status(200).json(error_message.err_update_not_found)
                }
            })

        }
        else {
            db.query('SELECT * FROM user_login WHERE user_id = ?', req.body.user_id, (err, result) => {
                if (err) throw err
                if (result[0]) {

                    db.query('UPDATE user_login SET ? WHERE user_id = ?', [update_data, req.body.user_id], (err, Setresult) => {
                        if (err) throw err;
                        else {
                            fs.writeFile(`./image/user/user_${req.body.user_id}.png`, req.body.image_profile.uri.slice(23), 'base64', (err, data) => {
                                if (err) throw err;
                                let image_profile = 'user_app/image/user_' + req.body.user_id + '.png'
                                db.query('UPDATE user_login SET image_profile=? WHERE user_id = ?', [image_profile, req.body.user_id], (err, result) => {
                                    console.log('re', req.body.id_product)
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


exports.update_password = () => {
    return (req, res, next) => {
        db.query('SELECT*FROM user_login WHERE user_id = ?', req.user_id, (err, result) => {
            if (err) throw err;
            if (result[0]) {
                let password = result[0].password
                if (bcrypt.compareSync(req.body.password, password)) {
                    let pass_update = {password: encrypt.encrypt(req.body.new_password)
                    }
                    db.query('UPDATE user_login SET password = ? WHERE user_id = ?', [pass_update.password, req.user_id], (err, result) => {
                        if (err) throw err;
                        req.result = result
                        console.log('อัพเดทรหัสผ่านสำเร็จ')
                        next()
                    })
                }
                else
                    res.status(200).json(error_message.err_check_password)
            }
            else
                res.status(200).json(error_message.err_update_not_found)
        })
    }
}
