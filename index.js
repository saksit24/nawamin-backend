var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment')
var logger = require('morgan')
var fs = require('fs')
var path = require('path')
var app = express();
var port = 3003
var version = '/api/v1/'
var mm = moment()
var gcm = require('node-gcm');
var nodemailer = require("nodemailer");
var schedule = require('node-schedule');
var db = require('./connect/db_connect')
var controler = require('./controller/control')

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "saksit2441@gmail.com",
        pass: "Skies241040"
    }
});

db.query('SELECT * FROM member', (err, result) => {
    if (err) throw err;
    if (result) {
        result.map((element) => {
            let d = element.date_end.getDate() - 7
            let y = element.date_end.getFullYear()
            let m = element.date_end.getMonth()
            var date = new Date(y, m, d, 0, 0, 0);
            // console.log('date', moment(date).format('YYYY-MM-DD HH:mm'))
            schedule.scheduleJob(date, function () {
                db.query('SELECT email FROM user_login WHERE user_id=? OR user_type="1" OR user_type="2"', element.user_id, (err, result2) => {
                    if (err) throw err
                    if (result2) {
                        result2.map((el) => {
                            // console.log('em',el.email)
                            let mailOptions = {
                                from: "saksit2441@gmail.com",
                                to: el.email,
                                subject: `สถานะของคุณใหล้หมดอายุการใช้งานแล้ว`,
                                text: `วันหมดอายุของคุณคือวันที่ ` + moment(element.date_end).format('DD-MM-YYYY')
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) throw error;
                                else {
                                    console.log("Email successfully sent!");
                                }
                                next()
                            });
                        })
                    }
                })
            })
        })
    }
})
let income_date = {
    date_incomde: moment(new Date()).format('YYYY-MM-DD')
}
var rule = new schedule.RecurrenceRule();
rule.hour = 23;
rule.minute = 30;
schedule.scheduleJob(rule, function () {
    db.query(`SELECT * FROM income WHERE date_income ='${income_date.date_incomde}'`, (err, result) => {
        if (err) throw err
        if (result) {
            let s1 = 0
            let s2 = 0
            let s3 = 0
            result.map((element) => {
                s1 = element.price_income + s1
                s2 = element.price_pay + s2
                s3 = s1 - s2
            })
            db.query(`SELECT COUNT(*) AS count FROM user_access WHERE date ='${income_date.date_incomde}'`, (err, result) => {
                if (err) throw err
                if (result) {
                    db.query('SELECT email FROM user_login WHERE user_type="1"', (err, result2) => {
                        if (err) throw err
                        if (result2[0]) {

                            let mailOptions = {
                                from: "saksit2441@gmail.com",
                                to: result2[0].email,
                                subject: `ข้อมูลวันที่ ` + moment(income_date.date_incomde).format('DD-MM-YYYY'),
                                text: `จำนวนผู้เข้าใช้งานทั้งหมด: ` + result[0].count + ` คน`
                                    + `รายรับ ` + s1 + `บาท`
                                    + `รายจ่าย ` + s2 + `บาท`
                                    + `รวมแล้ว ` + s3 + `บาท`

                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) throw error;
                                else {
                                    console.log("Email successfully sent!");
                                }
                                next()
                            });
                        }
                    })
                }
            })
        }
    })
})


// let tt = new Date().getDate() - 7
// let ttt = new Date().getFullYear()
// let t = new Date().getMonth()
// console.log(`${tt}-${t}-${ttt}`)

// var j = schedule.scheduleJob('*/30 * * * * *', function(){
//     console.log("time start ever 30 sec");
// });
var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(0, 6)]; //จ-0 อา-6
rule.hour = 00;
rule.minute = 0;
var j = schedule.scheduleJob(rule, function () {
    let mailOptions = {
        from: "saksit2441@gmail.com",
        to: "sittipon456@gmail.com",
        subject: `ไอ้ลองดูเฟิร์ส`,
        text: `กูตั้งเวลาไว้ 13.05 น. กำลังแดกข้าวอยู่นั่นเนาะ`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) throw error;
        else {
            console.log("Email successfully sent!");
        }
    });
});

// var j = schedule.scheduleJob('*/30 * * * * *', function(){
//     console.log("time start");
// //     let mailOptions = {
// //         from: "saksit2441@gmail.com",
// //         to: "sittipon456@gmail.com",
// //         subject: `ควย ไอ้เฟิร์ส`,
// //         text: `นี่คือระบบด่าอัตโนมัติ ควย ควย ควย...`
// //       };
// //       transporter.sendMail(mailOptions, function(error, info) {
// //         if (error) throw error;
// //         else {
// //           console.log("Email successfully sent!");
// //         }
// //       });
// });
console.log(j)



var date = mm.utc(+7).format('DD-MM-YYYY')
var time = mm.utc(+7).format('HH: mm: ss')
console.log(date, time)

app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization, X-Access-Token')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
});



// create mail transporter


// app.listen("3128");

/////


app.use(logger('dev'))
var accessLogStream = fs.createWriteStream(path.join(__dirname, `logs`, `'${date}'.log`), { flags: 'a' })
var configlog = `[${time}] [ip]: :remote-addr :remote-user [method]: :method [url]: :url HTTP/:http-version [status]: :status [response-time]: :response-time ms [client]: :user-agent`
app.use(logger(configlog, {
    stream: accessLogStream
}))
//user web
var show = require('./route/showdata');
app.use(version + 'user', show)
//product web
var product = require('./route/product');
app.use(version + 'product', product)
//promotion web
var promotion = require('./route/promotion');
app.use(version + 'promotion', promotion)
//user app
var user_app = require('./route/user_app');
app.use(version + 'user_app', user_app)
//promotion app
var app_pro = require('./route/app_pro');
app.use(version + 'app_pro', app_pro)

var app_sum = require('./route/app');
app.use(version + 'app', app_sum)

var pos = require('./route/pos');
app.use(version + 'pos', pos)

var course = require('./route/course');
app.use(version + 'course', course)

app.listen(port, function () {
    console.log("test app port" + port)
})
