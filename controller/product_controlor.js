var db = require('../connect/db_connect')
var encrypt = require('../const/encrypt')
var bcrypt = require('bcryptjs')
var jsonwebToken = require('jsonwebtoken')
var testfile = 'testfile.txt'
var error_message = require('../const/error_message')
var fs = require('fs')
var moment = require('moment')

exports.get_product = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM detail_product'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}


exports.get_product_sell = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM detail_product WHERE type_product != "4"'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}


exports.get_course_sell = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM detail_product WHERE type_product = "5"'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}
//show name for sell course (personal id)
exports.check_personal_id = () => {
    return (req, res, next) => {
        let sql = 'SELECT name,last_name,user_id FROM user_login WHERE personal_id = ?'
        db.query(sql, req.body.personal_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.get_product_update = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM detail_product WHERE id_product=?'
        db.query(sql, req.body.id_product, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

exports.delete_product = () => {
    return (req, res, next) => {
        // res.status(200).json({
        //     success:false,
        //     error_message:"ควย! ไม่ให้ลบ"
        // })
        db.query('DELETE FROM detail_product WHERE id_product = ?', req.body.id_product, (err, result) => {
            if (err) throw err;
            else {
                fs.unlink(`./image/product/product_${req.body.id_product}.png`, (err) => {
                    if (err) throw err;
                    else {
                        req.result = result
                        next()
                    }
                });

            }
        })
    }
}



exports.add_product_course = () => {
    return (req, res, next) => {
        console.log(req.body)
        if (req.body.name_product == '1') {
            var data1 = {
                name_product: 'รายครั้ง'
            }
            console.log('1')
            db.query('SELECT name_product FROM detail_product WHERE name_product = ?', data1.name_product, (err, result) => {
                if (err) {
                    res.status(200).json(error_message.err_have_course)
                }
                if (result) {
                    let data = {
                        name_product: data1.name_product,
                        price_product: req.body.price_product,
                        date_product: new Date(),
                        type_product: 5,
                        code_product: req.body.name_product
                    }
                    db.query('INSERT INTO detail_product SET ?', data, (err, result2) => {
                        if (err) throw err
                        next()
                    })
                }
                else {
                    res.status(200).json(error_message.err_have_course)
                }
            })
        }
        if (req.body.name_product == '2') {
            var data2 = {
                name_product: 'รายเดือน'
            }
            console.log('2')
            db.query('SELECT name_product FROM detail_product WHERE name_product = ?', data2.name_product, (err, result) => {
                if (err) {
                    res.status(200).json(error_message.err_have_course)
                }
                if (result) {
                    let data = {
                        name_product: data2.name_product,
                        price_product: req.body.price_product,
                        date_product: new Date(),
                        type_product: 5,
                        code_product: req.body.name_product
                    }
                    db.query('INSERT INTO detail_product SET ?', data, (err, result2) => {
                        if (err) throw err
                        next()
                    })
                }
                else {
                    res.status(200).json(error_message.err_have_course)
                }
            })
        }
        if (req.body.name_product == '3') {
            var data3 = {
                name_product: 'รายปี'
            }
            console.log('3')
            db.query('SELECT name_product FROM detail_product WHERE name_product = ?', data3.name_product, (err, result) => {
                if (err) {
                    res.status(200).json(error_message.err_have_course)
                }
                if (result) {
                    let data = {
                        name_product: data3.name_product,
                        price_product: req.body.price_product,
                        date_product: new Date(),
                        type_product: 5,
                        code_product: req.body.name_product
                    }
                    db.query('INSERT INTO detail_product SET ?', data, (err, result2) => {
                        if (err) throw err
                        next()
                    })
                }
                else {
                    res.status(200).json(error_message.err_have_course)
                }
            })
        }
    }
}



exports.add_product = () => {
    return (req, res, next) => {
        var data = {
            id_product: null,
            name_product: req.body.name_product,
            price_product: req.body.price_product,
            capital_price_product: req.body.capital_price_product,
            type_product: req.body.type_product,
            stock_product: req.body.stock_product,
            code_product: req.body.code_product,
            date_product: new Date()
            // image_product: `product/image/product_${req.body.id_product}.png`
        }
        console.log(data)
        db.query('INSERT INTO detail_product SET ? ', data, (err, result) => {
            if (err) throw err;
            fs.writeFile(`./image/product/product_${result.insertId}.png`, req.body.image_product.slice(23), 'base64', (err, data) => {
                let image_product = 'product/image/product_' + result.insertId + '.png'
                db.query('UPDATE detail_product SET image_product=? WHERE id_product = ?', [image_product, result.insertId], (err, result) => {
                    console.log('re', result.insertId)
                    if (err) throw err;
                })
                if (err) throw err;
                if (result) {
                    let income = {
                        date_income: new Date(),
                        detail_income: req.body.name_product,
                        type_income: '1',
                        price_income: req.body.capital_price_product
                    }
                    db.query('INSERT INTO income SET ?', income, (err, result) => {
                        if (err) throw err
                        next()
                    })
                }
                else
                    console.log('พบข้อผิดพลาด(1)')
            })
        })
    }
}

exports.update_product = () => {
    return (req, res, next) => {
        console.log('ss', req.body)
        let update_product = {
            name_product: req.body.name_product,
            price_product: req.body.price_product,
            type_product: req.body.type_product,
            capital_price_product: req.body.capital_price_product,
            stock_product: req.body.stock_product,
            code_product: req.body.code_product,
            // image_product: 'product/image/product_'+req.body.id_product+'.png'
        }
        if (req.body.image_product === `product/image/product_${req.body.id_product}.png`) {
            db.query('SELECT*FROM detail_product WHERE id_product = ?', req.body.id_product, (err, result) => {
                if (err) throw err;
                if (result[0]) {
                    db.query('UPDATE detail_product SET ? WHERE id_product = ?', [update_product, req.body.id_product], (err) => {
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
            console.log('ooo', req.body.image_product)
            db.query('SELECT*FROM detail_product WHERE id_product = ?', req.body.id_product, (err, result) => {
                if (err) throw err;
                if (result[0]) {

                    db.query('UPDATE detail_product SET ? WHERE id_product = ?', [update_product, req.body.id_product], (err) => {
                        if (err) throw err;
                        else {
                            fs.writeFile(`./image/product/product_${req.body.id_product}.png`, req.body.image_product.slice(23), 'base64', (err, data) => {
                                if (err) throw err;
                                let image_product = 'product/image/product_' + req.body.id_product + '.png'
                                db.query('UPDATE detail_product SET image_product=? WHERE id_product = ?', [image_product, req.body.id_product], (err, result) => {
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



// exports.slip_product = () => {
//     return (req, res, next) => {
//         db.query('SELECT user,email FROM user_login WHERE user_id=?', req.user_id, (err, result_user) => {
//             if (err) throw err
//             if (result_user[0]) {
//                 req.body.order.map((order_element, order_index) => {
//                     let product = {
//                         order_id: result.insertId,
//                         name_product: order_element.name_product,
//                         code_product: order_element.code_product,
//                         type_product: order_element.type_product,
//                         quantity_product: order_element.get_quantity,
//                         price_product: order_element.price_product,
//                     }
//                     db.query('SELECT * FROM detail_product WHERE name_product=?', product.name_product, (err, result_st) => {
//                         if (err) throw err;
//                         if (result_st) {
//                             let sum = 0
//                             result_st.map((ele) => {
//                                 sum = ele.stock_product - product.quantity_product
//                                 console.log('ele', ele)
//                             })
//                             console.log('sum', sum)
//                             if (sum >= 15) {
//                                 let mailOptions = {
//                                     from: "saksit2441@gmail.com",
//                                     to: result_user[0].email,
//                                     subject: `สินค้าในคลังใกล้หมด`,
//                                     text: `จำนวนสินค้าเหลือ` + sum + `โปรดตรวจสอบในคลัง`
//                                 };
//                                 transporter.sendMail(mailOptions, function (error, info) {
//                                     if (error) throw error;
//                                     else {
//                                         console.log("Email successfully sent!");
//                                     }
//                                     next()
//                                 });
//                                 res.status(200).json(error_message.err_product_not)
//                             } else {
//                                 let slip_product = {
//                                     sum_price_product: req.body.sum_price_product,
//                                     get_price_product: req.body.get_price_product,
//                                     change_price_product: req.body.change_price_product,
//                                     user: result_user[0].user,
//                                     date: new Date()
//                                 }
//                                 console.log('sss', slip_product)
//                                 db.query('INSERT INTO slip SET ?', slip_product, (err, result) => {
//                                     if (err) throw err
//                                     if (result) {
//                                         let income = {
//                                             price_income: req.body.sum_price_product,
//                                             date_income: new Date(),
//                                             detail_income: 'order ' + result.insertId + '',
//                                             type_income: '0'
//                                         }
//                                         console.log('income', income)
//                                         db.query('INSERT INTO income SET ?', income, (err, result_income) => {
//                                             if (err) throw err
//                                             if (result) {
//                                                 req.body.order.map((order_element, order_index) => {
//                                                     let product = {
//                                                         order_id: result.insertId,
//                                                         name_product: order_element.name_product,
//                                                         code_product: order_element.code_product,
//                                                         type_product: order_element.type_product,
//                                                         quantity_product: order_element.get_quantity,
//                                                         price_product: order_element.price_product,
//                                                     }
//                                                     console.log('product', product)
//                                                     db.query('INSERT INTO slip_sell SET ?', product, (err, result_order) => {
//                                                         if (err) throw err;
//                                                         db.query('UPDATE deail_product SET stock_product = ? WHERE name_product=?', [sum, ele.name_product], (err, result_up) => {
//                                                             if (err) throw err
//                                                             next()
//                                                         })
//                                                     })
//                                                 })
//                                             }
//                                             else
//                                                 console.log('พบข้อผิดพลาด2')

//                                         })
//                                     } else
//                                         console.log('พบข้อผิดพลาด1')
//                                 })
//                             }
//                         }
//                     })
//                 })
//             }
//             else
//                 console.log('ไม่พบผู้ใช้งาน กรุณาลงชื่อเข้าใช้')
//         })

//     }
// }


exports.slip_product = () => {
    return (req, res, next) => {
        db.query('SELECT user FROM user_login WHERE user_id=?', req.user_id, (err, result_user) => {
            if (err) throw err
            if (result_user[0]) {
                let slip_product = {
                    sum_price_product: req.body.sum_price_product,
                    get_price_product: req.body.get_price_product,
                    change_price_product: req.body.change_price_product,
                    user: result_user[0].user,
                    date: new Date()
                }
                console.log('sss', slip_product)
                db.query('INSERT INTO slip SET ?', slip_product, (err, result) => {
                    if (err) throw err
                    if (result) {
                        let income = {
                            price_income: req.body.sum_price_product,
                            date_income: new Date(),
                            detail_income: 'order ' + result.insertId + '',
                            type_income: '0'
                        }
                        console.log('income', income)
                        db.query('INSERT INTO income SET ?', income, (err, result_income) => {
                            if (err) throw err
                            if (result) {
                                req.body.order.map((order_element, order_index) => {
                                    let product = {
                                        order_id: result.insertId,
                                        name_product: order_element.name_product,
                                        code_product: order_element.code_product,
                                        type_product: order_element.type_product,
                                        quantity_product: order_element.get_quantity,
                                        price_product: order_element.price_product,
                                    }
                                    console.log('product', product)
                                    db.query('INSERT INTO slip_sell SET ?', product, (err, result_order) => {
                                        if (err) throw err;
                                        next()
                                    })
                                })
                            }
                            else
                                console.log('พบข้อผิดพลาด2')

                        })
                    } else
                        console.log('พบข้อผิดพลาด1')
                })

            }
            else
                console.log('ไม่พบผู้ใช้งาน กรุณาลงชื่อเข้าใช้')
        })

    }
}



exports.slip_course = () => {
    return (req, res, next) => {
        db.query('SELECT user FROM user_login WHERE user_id=?', req.user_id, (err, result_user) => {
            if (err) throw err
            if (result_user[0]) {
                let slip_product = {
                    sum_price_product: req.body.sum_price_product,
                    get_price_product: req.body.get_price_product,
                    change_price_product: req.body.change_price_product,
                    user: result_user[0].user,
                    date: new Date()
                }
                // console.log('sss', slip_product)
                // console.log(req.body)
                db.query('INSERT INTO slip SET ?', slip_product, (err, result) => {
                    if (err) throw err
                    if (result) {
                        let income = {
                            price_income: req.body.sum_price_product,
                            date_income: new Date(),
                            detail_income: 'order ' + result.insertId + '',
                            type_income: '0'
                        }
                        // console.log('income', income)
                        db.query('INSERT INTO income SET ?', income, (err, result_income) => {
                            if (err) throw err
                            if (result) {
                                req.body.order.map((order_element, order_index) => {
                                    let product = {
                                        order_id: result.insertId,
                                        name_product: order_element.name_product,
                                        code_product: order_element.code_product,
                                        type_product: order_element.type_product,
                                        quantity_product: order_element.get_quantity,
                                        price_product: order_element.price_product,
                                    }
                                    // console.log('product', product)
                                    db.query('INSERT INTO slip_sell SET ?', product, (err, result_order) => {
                                        if (err) throw err;
                                        if (result) {
                                            req.body.order.map((order_el) => {
                                                var date1 = moment(new Date());
                                                date1.utc();
                                                if (order_el.code_product == 1) {
                                                    date1.add(1, 'M');
                                                    let status = {
                                                        status_date: new Date(),
                                                        amount: order_el.get_quantity,
                                                        order_id: result.insertId,
                                                        status: order_el.code_product,
                                                        date_end: date1.format('YYYY-MM-DD')
                                                    }

                                                    // console.log(date1.format('l'))
                                                    db.query('UPDATE member SET ? WHERE user_id = ?', [status, req.body.user_id], (err, result_status) => {
                                                        if (err) throw err
                                                        next()
                                                    })
                                                }
                                                if (order_el.code_product == 2) {
                                                    date1.add(order_el.get_quantity, 'M');
                                                    let status = {
                                                        status_date: new Date(),
                                                        amount: order_el.get_quantity,
                                                        order_id: result.insertId,
                                                        status: order_el.code_product,
                                                        date_end: date1.format('YYYY-MM-DD')
                                                    }

                                                    // console.log(date1.format('l'))
                                                    db.query('UPDATE member SET ? WHERE user_id = ?', [status, req.body.user_id], (err, result_status) => {
                                                        if (err) throw err
                                                        next()
                                                    })
                                                }
                                                if (order_el.code_product == 3) {
                                                    date1.add(order_el.get_quantity, 'y');
                                                    let status = {
                                                        status_date: new Date(),
                                                        amount: order_el.get_quantity,
                                                        order_id: result.insertId,
                                                        status: order_el.code_product,
                                                        date_end: date1.format('YYYY-MM-DD')
                                                    }

                                                    // console.log(date1.format('l'))
                                                    db.query('UPDATE member SET ? WHERE user_id = ?', [status, req.body.user_id], (err, result_status) => {
                                                        if (err) throw err
                                                        next()
                                                    })
                                                }

                                            })
                                        } else
                                            console.log('error 1')
                                    })
                                })
                            }
                            else
                                console.log('พบข้อผิดพลาด2')

                        })
                    } else
                        console.log('พบข้อผิดพลาด1')
                })

            }
            else
                console.log('ไม่พบผู้ใช้งาน กรุณาลงชื่อเข้าใช้')
        })

    }
}



exports.get_slip = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM slip'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}



exports.get_detail_slip = () => {
    return (req, res, next) => {
        // console.log(req.body)
        db.query('SELECT * FROM slip WHERE order_id=?', req.body.order_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}


exports.get_slip_product = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM slip_sell WHERE order_id = ?'
        db.query(sql, req.body.order_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

//เพิ่มรายรับ-รายจ่าย
exports.add_income = () => {
    return (req, res, next) => {
        if (req.body.type_income == '0') {
            let data = {
                detail_income: req.body.detail_income,
                date_income: req.body.date_income,
                price_income: req.body.price_income,
                type_income: req.body.type_income,
                date_income: new Date()
            }
            db.query('INSERt INTO income SET ?', data, (err, result) => {
                if (err) throw err
                else
                    next()
            })
            console.log('get')
        }
        if (req.body.type_income == '1') {
            let data = {
                detail_income: req.body.detail_income,
                date_income: req.body.date_income,
                price_pay: req.body.price_income,
                type_income: req.body.type_income,
                date_income: new Date()
            }
            db.query('INSERt INTO income SET ?', data, (err, result) => {
                if (err) throw err
                else
                    next()
            })
            // console.log('pay')
        }

    }
}

//ดูรายรัย-รายจ่าย
exports.get_income = () => {
    return (req, res, next) => {
        db.query('SELECT*FROM income', (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}

//ดูรายรับ
exports.income_get = () => {
    return (req, res, next) => {
        db.query('SELECT*FROM income WHERE type_income="0"', (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}

//ดูรายจ่าย
exports.income_pay = () => {
    return (req, res, next) => {
        db.query('SELECT*FROM income WHERE type_income="1"', (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}

//ดูเพื่อแก้ไข
exports.get_up_income = () => {
    return (req, res, next) => {
        db.query('SELECT*FROM income WHERE id_income =?', req.body.id_income, (err, result) => {
            if (err) throw err
            else {
                req.result = result[0]
                next()
            }
        })
    }
}


exports.income = () => {
    return (req, res, next) => {
        let date = {
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd
        }
        db.query(`SELECT * FROM income WHERE date_income >= '${date.dateStart}' AND date_income <= '${date.dateEnd}'`, (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}

exports.detail_income = () => {
    return (req, res, next) => {
        console.log(req.body)
        let sql = 'SELECT * FROM income ORDER BY date_income'
        db.query(sql, (err, result) => {
            if (err) throw err
            else {
                req.result = result
                next()
            }
        })
    }
}





// exports.update_product = () => {
//     return (req, res, next) => {
//         let update_product = {
//             name_product: req.body.name_product,
//             price_product: req.body.price_product,
//             type_product: req.body.type_product,
//             capital_price_product: req.body.capital_price_product,
//             stock_product: req.body.stock_product,
//             code_product: req.body.code_product,
//             // image_product: 'product/image/product_'+req.body.id_product+'.png'
//         }
//         db.query('SELECT*FROM detail_product WHERE id_product = ?', req.body.id_product, (err, result) => {
//             if (err) throw err;
//             if (result[0]) {
//                 let image_product = result[0].image_product
//                 if(image_product!= (image_product).toString('base64')){
//                     fs.unlink(`./image/product/product_${req.body.id_product}.png`, (err) => {
//                         if (err) throw err;
//                     })
//                 }
//                 db.query('UPDATE detail_product SET ? WHERE id_product = ?', [update_product, req.body.id_product], (err, result) => {
//                     if (err) throw err;
//                     else {
//                         req.result = result
//                         console.log('อัพเดทข้อมูลสำเร็จ')
//                         next()
//                     }
//                 })
//             }
//             else {
//                 console.log('ไม่พบข้อมูลผู้มช้งาน')
//                 res.status(200).json(error_message.err_update_not_found)
//             }
//         })

//     }
// }


// exports.add_product = () => {
//     return (req, res, next) => {
//         fs.readFile("D:/fitnesspos/fitness/image/test.jpg", (err, data) => {
//             if (err) throw err
//             else {
//                 console.log(data)
//                 req.result = (data).toString('base64')

//                 if(req.result){
//                     if (err) throw err
//                     else{
//                         fs.writeFile('./image/testee.jpg',req.result,'base64',(err,data)=>{
//                             next()
//                         })


//                     }
//                 }
//             }
//         })
//     }
// }

