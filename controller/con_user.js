var db = require('../connect/db_connect')
var encrypt = require('../const/encrypt')
var bcrypt = require('bcryptjs')
var jsonwebToken = require('jsonwebtoken')
var testfile = 'testfile.txt'
var error_message = require('../const/error_message')
var fs = require('fs')
var multer = require('multer')

exports.login = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM `user` WHERE username= ?', req.body.username, (err, result) => {
            if (err) throw err;
            if (result[0]) {
                let password = result[0].password
                if (bcrypt.compareSync(req.body.password, password)) {
                    req.token = jsonwebToken.sign({
                        id: result[0].user_id,
                        usertype: result[0].usertype
                    }, 'secret')
                    next()
                }
                else
                    res.status(200).json(error_message.err_wrong_password)

            } else
                res.status(200).json(error_message.user_work_not_found)
        })
    }
}



exports.register = () => {
    return (req, res, next) => {
        console.log(req.body)
        var data = {
            username: req.body.username,
            name: req.body.name,
            last_name: req.body.last_name,
            password: encrypt.encrypt(req.body.password),
            email: req.body.email,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            usertype: 2,
            personal_id: req.body.personal_id,
            dob: req.body.dob,
            // date: new Date()
        }
        db.query('INSERT INTO user SET ?', data, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('User Not');
                    res.status(200).json({
                        'Success': false,
                        'error_message': 'บัญชีนี้มีผู้ใช้งานแล้ว'
                    })
                }
                else
                    throw err;
            } else {
                next()
            }
        })
    }
}


exports.register_admin = () => {
    return (req, res, next) => {
        console.log(req.body)
        var data = {
            username: req.body.username,
            name: req.body.name,
            last_name: req.body.last_name,
            password: encrypt.encrypt(req.body.password),
            email: req.body.email,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            usertype: 1,
            personal_id: req.body.personal_id,
            dob: req.body.dob,
            // date: new Date()
        }
        db.query('INSERT INTO user SET ?', data, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('User Not');
                    res.status(200).json({
                        'Success': false,
                        'error_message': 'บัญชีนี้มีผู้ใช้งานแล้ว'
                    })
                }
                else
                    throw err;
            } else {
                next()
            }
        })
    }
}

exports.profile = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM user WHERE user_id = ? ', req.user_id, (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.update_user = () => {
    return (req, res, next) => {
        // console.log('im',req.body.image_profile)
        let update_data = {
            // username: req.body.username,
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            dob: req.body.dob,
            personal_id: req.body.personal_id,
            // gender: req.body.gender,
        }
        if (req.body.userimg === `user/image/user_${req.user_id}.png`) {
            console.log('yyyy', req.body.userimg)
            db.query('SELECT * FROM user WHERE user_id = ?', req.user_id, (err, result) => {
                if (err) throw err
                if (result[0]) {
                    db.query('UPDATE user SET ? WHERE user_id = ?', [update_data, req.user_id], (err, Setresult) => {
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
            db.query('SELECT * FROM user WHERE user_id = ?', req.user_id, (err, result) => {
                if (err) throw err
                if (result[0]) {

                    db.query('UPDATE user SET ? WHERE user_id = ?', [update_data, req.user_id], (err, Setresult) => {
                        if (err) throw err;
                        else {
                            fs.writeFile(`./image/user/user_${req.user_id}.png`, req.body.userimg.slice(23), 'base64', (err, data) => {
                                if (err) throw err;
                                let userimg = 'user/image/user_' + req.user_id + '.png'
                                db.query('UPDATE user SET userimg=? WHERE user_id = ?', [userimg, req.user_id], (err, result) => {
                                    console.log('re', req.user_id)
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
        db.query('SELECT * FROM user WHERE user_id = ?', req.user_id, (err, result) => {
            if (err) throw err;
            if (result[0]) {
                let password = result[0].password
                if (bcrypt.compareSync(req.body.password, password)) {
                    let pass_update = {
                        password: encrypt.encrypt(req.body.new_password)
                    }
                    db.query('UPDATE user SET password = ? WHERE user_id = ?', [pass_update.password, req.user_id], (err) => {
                        if (err) throw err;
                        else {
                            
                            console.log(req.body)
                            console.log('อัพเดทรหัสผ่านสำเร็จ')
                            next()
                        }

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



//เพิ่มบัญชีธนาคาร
exports.add_account = () => {
    return (req, res, next) => {
        // console.log(req.body)
        let data = {
            account: 0
        }
        db.query('INSERT INTO bank_account SET ?', data, (err, result) => {
            fs.writeFile(`./image/account/account_${result.insertId}.png`, req.body.account.slice(23), 'base64', (err, data) => {
                let account = 'account/image/account_' + result.insertId + '.png'
                db.query('UPDATE bank_account SET account = ? WHERE account_id = ?', [account, result.insertId], (err, result) => {
                    if (err) throw err;
                    next()
                })
            })
        })


    }
}
//เรียกดูบัญชีธนาคาร
exports.get_account = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM bank_account', (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

//เรียกดูบัญชีธนาคาร
exports.get_account_user = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM bank_account', (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}
//เรียกดูบัญชีธนาคารเพื่อแก้ไข
exports.get_update_account = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM bank_account WHERE account_id=?'
        db.query(sql, req.body.account_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

//แก้ไขบัญชีธนาคาร

exports.update_account = () => {
    return (req, res, next) => {
        let data = {
            bank_name: req.body.bank_name,
            branch_name: req.body.branch_name,
            account_number: req.body.account_number,
            account_name: req.body.account_name
        }
        console.log(req.body)
        db.query('SELECT * FROM bank_account WHERE account_id = ?', req.body.account_id, (err, result) => {
            if (err) throw err
            if (result[0]) {
                db.query('UPDATE bank_account SET ? WHERE account_id = ?', [data, req.body.account_id], (err, result) => {
                    if (err) throw err;
                    console.log('อัพเดทข้อมูลสำเร็จ')
                    next()
                })
            }
            else {
                console.log('ไม่พบข้อมูลบัญชีนี้')
                res.status(200).json(error_message.err_accouct_not_found)
            }
        })

    }
}

//ลบบัญชีธนาคาร
exports.delete_account = () => {
    return (req, res, next) => {
        db.query('DELETE FROM bank_account WHERE account_id = ?', req.body.account_id, (err, result) => {
            if (err) throw err;
            else {
                fs.unlink(`./image/account/account_${req.body.account_id}.png`, (err) => {
                    if (err) throw err;
                    else {
                        req.result = result
                        next()
                    }
                })
            }
        })
    }
}
