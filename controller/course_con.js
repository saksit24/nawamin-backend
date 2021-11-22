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


const day = [
    "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"
]

exports.get_all = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM course_sup'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                let result_data = []
                day.map((day_element, day_index) => {
                    let course_data = []
                    result.map((result_element, result_index) => {
                        console.log("result_element.day_sub", result_element.day_sup)
                        if (day_element === result_element.day_sup) {

                            course_data.push(result_element)
                        }
                    })
                    result_data.push({
                        day: day_element,
                        course_result: course_data
                    })
                })
                req.result = result_data
                next()
            }
        })
    }
}


exports.all_course = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM course_main'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.get_user_book = () => {
    return (req, res, next) => {
        // console.log('GG: ',req.user_id)
        let sql = 'SELECT * FROM user_login WHERE user_id = ?'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                // console.log(result)
                req.result = result[0]
                next()
            }
        })
    }
}

exports.book = () => {
    return (req, res, next) => {
        let obj = {
            date_book: req.body.date_book,
            time_book: req.body.time_book,
            price_book: req.body.price_book,
            user_mem: req.user_id,
            user_train: req.body.user_train,
            user_name:req.body.user,
            name: req.body.name
        }
        console.log('sss', obj)
        db.query('INSERT INTO book_train SET ?', obj, (err, result) => {
            if (err) throw err
            else
                next()
        })
    }
}

exports.main = () => {
    return (req, res, next) => {
        let obj = {
            name_main: req.body.name_main,
            detail_main: req.body.detail_main,
            price_main: req.body.price_main,

        }
        console.log('sss', obj)
        db.query('INSERT INTO course_main SET ?', obj, (err, result) => {
            if (err) throw err
            else
                next()
        })
    }
}


exports.validate_main = () => {
    return (req, res, next) => {
        if (req.body.name_main &&
            req.body.detail_main &&
            req.body.price_main
        ) {
            next();
        }
        else {
            res.status(200).json(errorMessage.invalid_data)
        }
    }
}


exports.sup = () => {
    return (req, res, next) => {
        let obj = {
            day_sup: req.body.day_sup,
            time_start_sup: req.body.time_start_sup,
            time_end_sup: req.body.time_end_sup,
            location_sup: req.body.location_sup,
            course_sup: req.body.course_sup,

        }
        console.log('sss', obj)
        db.query('INSERT INTO course_sup SET ?', obj, (err, result) => {
            if (err) throw err
            else
                next()
        })
    }
}



exports.delete_course = () => {
    return (req, res, next) => {
        db.query('DELETE FROM course_main WHERE id_main = ?', req.body.id_main, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}


exports.get_main_update = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM course_main WHERE id_main=?'
        db.query(sql, req.body.id_main, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}



exports.update_main = () => {
    return (req, res, next) => {
        let update_data = {
            name_main: req.body.name_main,
            price_main: req.body.price_main,
            detail_main: req.body.detail_main,
        }

    console.log('id',req.body.user_id)
        db.query('SELECT * FROM course_main WHERE id_main = ?', req.body.id_main, (err, result) => {
            if (err) throw err
            console.log('reees',result)
            if (result[0]) {
                db.query('UPDATE course_main SET ? WHERE id_main = ?', [update_data, req.body.id_main], (err, Setresult) => {
                    if (err) throw err;
                    else {
                        req.result = Setresult
                        console.log('ss',req.result)
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
