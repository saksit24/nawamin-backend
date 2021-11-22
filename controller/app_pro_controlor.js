var db = require('../connect/db_connect')
var encrypt = require('../const/encrypt')
var bcrypt = require('bcryptjs')
var jsonwebToken = require('jsonwebtoken')
var testfile = 'testfile.txt'
var error_message = require('../const/error_message')
var fs = require('fs')


exports.img_promotiotion_app = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM promotion ORDER BY id_promotion DESC'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.get_promotion_app = () => {
    
    return (req, res, next) => {
        console.log('body',req.body)
        let sql = 'SELECT * FROM promotion WHERE id_promotion = ?'
        db.query(sql, req.body.id_promotion, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.get_all_promotion_app = () => {
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



