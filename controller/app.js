var db = require('../connect/db_connect')
var encrypt = require('../const/encrypt')
var bcrypt = require('bcryptjs')
var jsonwebToken = require('jsonwebtoken')
var testfile = 'testfile.txt'
var error_message = require('../const/error_message')
var fs = require('fs')
var multer = require('multer')
var errorMessage = require('../const/error_message')
var constanc = require('../const/constance')



exports.add_gym = () => {
    return (req, res, next) => {
        let obj = {
            name_gym: req.body.name_gym,
            address_gym: req.body.address_gym,
            phone_1: req.body.phone_1,
            phone_2: req.body.phone_2,
            fb_gym: req.body.fb_gym,
            email_gym: req.body.email_gym,
        }
        console.log('sss', obj)
        db.query('INSERT INTO data_gym SET ?', obj, (err, result) => {
            if (err) throw err
            else
                next()
        })
    }
}

exports.validate_add_gym = () => {
    return (req, res, next) => {
        if (req.body.name_gym &&
            req.body.address_gym &&
            req.body.phone_1 &&
            req.body.phone_2 &&
            req.body.email_gym &&
            req.body.fb_gym) {
            next();
        }
        else {
            res.status(200).json(errorMessage.invalid_data)
        }
    }
}

exports.get_gym = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM data_gym ORDER BY id_gym DESC'
        db.query(sql, req.body.id_gym, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.notification_book = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM book_train ORDER BY id_book DESC'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.check_payment = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM book_train WHERE status_train ="1" ORDER BY id_book DESC'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.get_payment = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM book_train WHERE id_book=?', req.body.id_book, (err, result) => {
            if (err) throw err
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.get_payment_detail = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM user_login WHERE user_id=?', req.body.user_id, (err, result) => {
            if (err) throw err
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.add_status = () => {
    return (req, res, next) => {
        console.log('STD', req.body)
        db.query('SELECT * FROM book_train WHERE id_book = ?', req.body.id_book, (err, result) => {
            if (err) throw err;
            else {
                db.query('UPDATE book_train SET status_train = ? WHERE id_book=?', [req.body.status_train,req.body.id_book], (err, result_book) => {
                    if (err) throw err;
                    next()
                })
            }
        })
    }
}

exports.get_accept = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM book_train WHERE id_book=?', req.body.id_book, (err, result) => {
            if (err) throw err
            else {
                req.result = result[0]
                next()
            }
        })

    }
}

exports.get_accept_detail = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM user_login WHERE user_id=?', req.body.user_id, (err, result) => {
            if (err) throw err
            else {
                req.result = result[0]
                next()
            }
        })
    }
}


exports.notification_mem = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM book_train WHERE status_train !="0" ORDER BY id_book DESC'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.get_book = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM trainer_book WHERE user_id=?'
        db.query(sql, req.body.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.add_account = () => {
    return (req, res, next) => {
        let data = {
            user_id: req.body.user_id,
            bank_ac: req.body.bank_ac,
            number_ac: req.body.number_ac,
            branch_ac: req.body.branch_ac,
            name_ac: req.body.name_ac
        }
        console.log('account', req.body)
        db.query('INSERT INTO account SET ?', data, (err, result) => {
            if (err) throw err;
            else {
                next()
            }
        })
    }
}

exports.get_account = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM account WHERE user_id = ?', req.body.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.show_account = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM account WHERE user_id = ?', req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.get_update_account = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM account WHERE id_ac=?'
        db.query(sql, req.body.id_ac, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.update_account = () => {
    return (req, res, next) => {
        let data = {
            // user_id: req.body.user_id,
            bank_ac: req.body.bank_ac,
            number_ac: req.body.number_ac,
            branch_ac: req.body.branch_ac,
            name_ac: req.body.name_ac
        }
        db.query('SELECT * FROM account WHERE id_ac = ?', req.body.id_ac, (err, result) => {
            if (err) throw err
            if (result[0]) {
                db.query('UPDATE account SET ? WHERE id_ac = ?', [data, req.body.id_ac], (err, result) => {
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

exports.delete_account = () => {
    return (req, res, next) => {
        db.query('DELETE FROM account WHERE id_ac = ?', req.body.id_ac, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.add_img_payment = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM book_train WHERE id_book=? ', req.body.id_book, (err, result) => {
            if (err) throw err;
            fs.writeFile(`./image/payment/payment_${req.body.id_book}.png`, req.body.img_payment.uri.slice(23), 'base64', (err, data) => {
                let img_payment = 'app/image/payment_' + req.body.id_book + '.png'
                db.query('UPDATE book_train SET img_payment=? WHERE id_book = ?', [img_payment, req.body.id_book], (err, result2) => {
                    if (err) throw err;
                    if (result) {
                        db.query('UPDATE book_train SET status_mem="1" WHERE id_book =?', req.body.id_book, (err, result3) => {
                            if (err) throw err
                            next()
                        })
                    }
                })
            })
        })
    }
}


exports.add_status_payment = () => {
    return (req, res, next) => {
        console.log('STD', req.body)
        db.query('SELECT * FROM book_train WHERE id_book = ?', req.body.id_book, (err, result) => {
            if (err) throw err;
            else {
                db.query('UPDATE book_train SET status_payment="1" WHERE id_book= ? ', req.body.id_book, (err, result_book) => {
                    if (err) throw err;
                    next()
                })
            }
        })
    }
}

exports.delete_request = () => {
    return (req, res, next) => {
        console.log(req.body)
        db.query('DELETE FROM book_train WHERE id_book = ?', req.body.id_book, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

