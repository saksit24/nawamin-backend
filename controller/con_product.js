var db = require('../connect/db_connect')
var encrypt = require('../const/encrypt')
var bcrypt = require('bcryptjs')
var jsonwebToken = require('jsonwebtoken')
var testfile = 'testfile.txt'
var error_message = require('../const/error_message')
var fs = require('fs')
var multer = require('multer')

//เพิ่มสินค้าใหม่เข้าระบบ
exports.add_product = () => {
    return (req, res, next) => {
        var data = {
            id_product: null,
            name_product: req.body.name_product,
            price_product: req.body.price_product,
            detail_product: req.body.detail_product,
            type_product: req.body.type_product,
            image_product: req.body.image_product,
            s: req.body.s,
            m: req.body.m,
            l: req.body.l,
            xl: req.body.xl,
            xxl: req.body.xxl,
            xxxl: req.body.xxxl,
            xxxxl: req.body.xxxxl,
            xxxxxl: req.body.xxxxxl,
            date: new Date(),

        }
        // console.log(data)
        db.query('INSERT INTO product SET ? ', data, (err, result) => {
            if (err) throw err;
            fs.writeFile(`./image/product/product_${result.insertId}.png`, req.body.image_product.slice(23), 'base64', (err, data) => {
                let image_product = 'product/image/product_' + result.insertId + '.png'
                db.query('UPDATE product SET image_product=? WHERE id_product = ?', [image_product, result.insertId], (err, result) => {
                    if (err) throw err;
                    else
                        next()
                })
            })
        })
    }
}

//แสดงรายการสินค้าทั้งหมด
exports.list_product = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM product'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

//เรียกดูสินค้าตามไอดี
exports.get_product = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM product WHERE id_product = ?'
        db.query(sql, req.body.id_product, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}
//เรียกดูสินค้าเพื่อแก้ไขข้อมูล
exports.get_update = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM product WHERE id_product = ?'
        db.query(sql, req.body.id_product, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}
//ลบข้อมูลสินค้า
exports.delete_product = () => {
    return (req, res, next) => {
        console.log(req.body)
        db.query('DELETE FROM product WHERE id_product = ?', req.body.id_product, (err, result) => {
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

//แก้ไขข้อมูลสินค้า
exports.update_product = () => {
    return (req, res, next) => {
        // console.log('ss', req.body)
        let update_product = {
            name_product: req.body.name_product,
            price_product: req.body.price_product,
            detail_product: req.body.detail_product,
            type_product: req.body.type_product,
            image_product: req.body.image_product,
            s: req.body.s,
            m: req.body.m,
            l: req.body.l,
            xl: req.body.xl,
            xxl: req.body.xxl,
            xxxl: req.body.xxxl,
            xxxxl: req.body.xxxxl,
            xxxxxl: req.body.xxxxxl
        }
        console.log('id', req.body.id_product)
        if (req.body.image_product === `product/image/product_${req.body.id_product}.png`) {
            console.log('test1')
            db.query('SELECT * FROM product WHERE id_product = ?', req.body.id_product, (err, result) => {
                if (err) throw err;
                if (result[0]) {
                    db.query('UPDATE product SET ? WHERE id_product = ?', [update_product, req.body.id_product], (err) => {
                        if (err) throw err;
                        req.result = result
                        console.log('อัพเดทข้อมูลสำเร็จ')
                        next()
                    })
                }
                else {
                    console.log('ไม่พบข้อมูลสินค้า')
                    res.status(200).json(error_message.err_product_info)
                }
            })

        }
        else {
            db.query('SELECT * FROM product WHERE id_product = ?', req.body.id_product, (err, result) => {
                console.log('test2')
                if (err) throw err;
                if (result[0]) {

                    db.query('UPDATE product SET ? WHERE id_product = ?', [update_product, req.body.id_product], (err) => {
                        if (err) throw err;
                        else {
                            fs.writeFile(`./image/product/product_${req.body.id_product}.png`, req.body.image_product.slice(23), 'base64', (err, data) => {
                                if (err) throw err;
                                let image_product = 'product/image/product_' + req.body.id_product + '.png'
                                db.query('UPDATE product SET image_product=? WHERE id_product = ?', [image_product, req.body.id_product], (err, result) => {
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
                    console.log('ไม่พบข้อมูลสินค้า')
                    res.status(200).json(error_message.err_product_info)
                }
            })
        }


    }
}
//เรียดูสินค้า หน้ารายการสินค้าสำหรับ user
exports.product = () => {
    return (req, res, next) => {
        let sql = 'SELECT id_product,name_product,image_product,price_product,type_product FROM product'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}
//เพิ่มสินค้าลงตะกร้าทีละ 1 รายการ
exports.add_order = () => {
    return (req, res, next) => {
        let obj = {
            // order_id: null,
            user_id: req.user_id,
            order_status: 0,
            id_product: req.body.id_product,
            s: req.body.s,
            m: req.body.m,
            l: req.body.l,
            xl: req.body.xl,
            xxl: req.body.xxl,
            xxxl: req.body.xxxl,
            xxxxl: req.body.xxxxl,
            xxxxxl: req.body.xxxxxl,
            name_product: req.body.name_product,
            price_product: req.body.price_product

        }
        db.query('INSERT INTO order_product SET ? ', obj, (err, result) => {
            if (err) throw err
            else {
                db.query('SELECT * FROM product WHERE id_product = ?', obj.id_product, (err, result2) => {
                    if (err) throw err
                    else {
                        let amount = {
                            s: result2[0].s - req.body.s,
                            m: result2[0].m - req.body.m,
                            l: result2[0].l - req.body.l,
                            xl: result2[0].xl - req.body.xl,
                            xxl: result2[0].xxl - req.body.xxl,
                            xxxl: result2[0].xxxl - req.body.xxxl,
                            xxxxl: result2[0].xxxxl - req.body.xxxxl,
                            xxxxxl: result2[0].xxxxxl - req.body.xxxxxl
                        }
                        db.query('UPDATE product SET ? WHERE id_product = ?', [amount, obj.id_product], (err, result3) => {
                            if (err) throw err
                            else
                                next()
                        })
                    }
                })
            }
        })
    }
}
//เรียกดูสินค้าในตะกร้า
exports.get_cart = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM order_product WHERE user_id = ? AND order_status = 0'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                if (!result[0]) {
                    res.status(200).json({
                        error_message: "ไม่พบรายการตระกร้าสินค้า"
                    })
                }
                else {
                    req.result = result
                    next()
                }

            }
        })
    }
}

//ลบข้อมูลสินค้าในตะกร้า
exports.delete_order = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM order_product WHERE order_id = ?', req.body.order_id, (err, result) => {
            if (err) throw err
            else {
                db.query('SELECT * FROM product WHERE id_product = ?', result[0].id_product, (err, result2) => {
                    if (err) throw err
                    else {
                        let amount = {
                            s: result2[0].s + result[0].s,
                            m: result2[0].m + result[0].m,
                            l: result2[0].l + result[0].l,
                            xl: result2[0].xl + result[0].xl,
                            xxl: result2[0].xxl + result[0].xxl,
                            xxxl: result2[0].xxxl + result[0].xxxl,
                            xxxxl: result2[0].xxxxl + result[0].xxxxl,
                            xxxxxl: result2[0].xxxxxl + result[0].xxxxxl
                        }
                        db.query('UPDATE product SET ? WHERE id_product = ?', [amount, result[0].id_product], (err, result3) => {
                            if (err) throw err
                            else {
                                db.query('DELETE FROM order_product WHERE order_id = ?', req.body.order_id, (err, result4) => {
                                    if (err) throw err;
                                    else {
                                        next()
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    }
}

//ดึงข้อมูลสินค้าในตะกร้า
exports.cart_product = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM product WHERE id_product = ?'
        db.query(sql, req.body, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}



//เพิ่มวิดีโอ
exports.video = () => {
    return (req, res, next) => {
        let obj = {
            url: req.body.url
        }
        db.query("SELECT * FROM video WHERE id_video = 1", (err, result1) => {
            if (result1 != '') {
                db.query('UPDATE video SET url=? WHERE id_video = 1', obj.url, (err, result2) => {
                    if (err) throw err
                    else
                        next()
                })
            } else {
                db.query('INSERT INTO video SET ?', obj, (err, result) => {
                    if (err) throw err
                    else
                        next()
                })
            }
        })
    }
}

//เรียกดูวิดีโอ
exports.get_video = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM video WHERE id_video = 1'
        db.query(sql, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

//รายการสั่งซื้อ
exports.add_receipt = () => {
    return (req, res, next) => {
        let obj = {
            sum_price: req.body.sum_price,
            user_id: req.user_id,
            date: new Date()
        }
        db.query('INSERT INTO receipt SET ?', obj, (err, result) => {
            if (result) {
                req.body.cart.map((element) => {
                    return (
                        db.query('UPDATE order_product SET receipt_id = ?,order_status = 1 WHERE order_id=?', [result.insertId, element.order_id], (err, result_book) => {
                            if (err) throw err;
                            next()
                        })
                    )
                })
            }
            else {
                if (err) throw err;
                next()
            }
        })
    }
}
//เรียกดูสถานะการสั่งซื้อ
exports.get_receipt = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM receipt WHERE user_id = ? ORDER BY receipt_id DESC'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

//เรียกดูสถานะการสั่งซื้อที่รอการยืนยันการชำระเงิน
exports.ex_status = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM receipt WHERE ex_status = 0 OR ex_status = 1 ORDER BY receipt_id DESC'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

//เรียกดูสถานะการสั่งซื้อที่รอการจัดส่ง
exports.get_status2 = () => {
    return (req, res, next) => {
        let sql = 'SELECT * FROM receipt WHERE ex_status = 2  OR ex_status = 3 ORDER BY receipt_id DESC'
        db.query(sql, req.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}



//เรียกดูข้อมูลสมาชิกในรายการซื้อสินค้า
exports.user_status = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM user WHERE user_id = ?', req.body.user_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}
//เรียกดูสินค้าในตะกร้ารายการสั่งซื้อ
exports.get_product_ex = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM order_product WHERE user_id = ? AND order_status = 1 AND receipt_id = ?', [req.body.user_id, req.body.receipt_id], (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

//เรียกดูสินค้าในตะกร้ารายการสั่งซื้อสำหรับลูกค้า
exports.get_product_user = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM order_product WHERE receipt_id = ?', req.body.receipt_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result
                next()
            }
        })
    }
}

//รายละเอียดรายการสั่งซื้อสำหรับลูกค้า
exports.detail_ex_user = () => {
    return (req, res, next) => {
        db.query('SELECT date,sum_price FROM receipt WHERE receipt_id = ?', req.body.receipt_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}

//ลบรายการสั่งซื้อสำหรับลูกค้า
exports.delete_receipt = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM order_product WHERE receipt_id = ?', req.body.receipt_id, (err, result) => {
            if (err) throw err
            else {
                result.map((element) => {
                    return (
                        db.query('SELECT * FROM product WHERE id_product = ?', element.id_product, (err, result2) => {
                            if (err) throw err
                            else {
                                let amount = {
                                    s: result2[0].s + element.s,
                                    m: result2[0].m + element.m,
                                    l: result2[0].l + element.l,
                                    xl: result2[0].xl + element.xl,
                                    xxl: result2[0].xxl + element.xxl,
                                    xxxl: result2[0].xxxl + element.xxxl,
                                    xxxxl: result2[0].xxxxl + element.xxxxl,
                                    xxxxxl: result2[0].xxxxxl + element.xxxxxl
                                }
                                db.query('UPDATE product SET ? WHERE id_product = ?', [amount, element.id_product], (err, result3) => {
                                    if (err) throw err
                                    else {
                                        db.query('DELETE order_product,receipt FROM order_product INNER JOIN receipt ON order_product.receipt_id = receipt.receipt_id WHERE receipt.receipt_id = ?', req.body.receipt_id, (err, result4) => {
                                            if (err) throw err;
                                            else {
                                                next()
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    )
                })

            }
        })
    }
}


//รายละเอียดรายการสั่งซื้อ
exports.detail_ex = () => {
    return (req, res, next) => {
        db.query('SELECT * FROM receipt WHERE receipt_id = ?', req.body.receipt_id, (err, result) => {
            if (err) throw err;
            else {
                req.result = result[0]
                next()
            }
        })
    }
}


//อัพโหลดหลักฐานการโอน
exports.upload_receipt = () => {
    return (req, res, next) => {
        // console.log(req.body)
        fs.writeFile(`./image/receipt/receipt_${req.body.receipt_id}.png`, req.body.receipt_img.slice(23), 'base64', (err, data) => {
            let receipt_img = 'receipt/image/receipt_' + req.body.receipt_id + '.png'
            db.query('UPDATE receipt SET receipt_img = ?,ex_status = 1 WHERE receipt_id = ?', [receipt_img, req.body.receipt_id], (err, result) => {
                if (err) throw err;
                next()
            })
        })

    }
}
//เปลี่ยนสถานะการสั่ง
exports.ex_status2 = () => {
    return (req, res, next) => {
        db.query('UPDATE receipt SET ex_status = 2 WHERE receipt_id = ? ', req.body.receipt_id, (err, result) => {
            if (err) throw err;
            next()
        })
    }
}
//เพิ่ม tracking ติดตามสินค้า
exports.add_track = () => {
    return (req, res, next) => {
        db.query('UPDATE receipt SET ex_status = 3,track = ? WHERE receipt_id = ? ', [req.body.track, req.body.receipt_id], (err, result) => {
            if (err) throw err;
            next()
        })
    }
}

