const express = require('express')
const router = express.Router()

const dbConn = require('../utils/dbConn');
const sql = require('../sqlMap');
const { Router, response } = require('express');

var qr_image = require('qr-image');
var fs = require('fs');

// 查询该账户二维码
router.post('/selectCode', (req, res) => {
    let sqlStr = sql.code.select;
    let params = req.body;
    let conn = new dbConn().getConn();
    conn.query(sqlStr, [params.cuid], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});

// 添加二维码信息
router.post('/addCode', (req, res) => {
    let sqlStr = sql.code.add;
    let params = req.body;
    let conn = new dbConn().getConn();

    let datetime = new Date();

    conn.query(sqlStr, [params.cpid, params.cpname, datetime, params.cuid], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});

//二维码生成
router.get('/qrcode',function(req,res){
    var pid = req.query.pid;

    let sqlStr = sql.product.selectP;
    let conn = new dbConn().getConn();
    conn.query(sqlStr, [pid], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            let Jresult = JSON.stringify(result);
            var temp_qrcode = qr_image.image(Jresult);
            res.type('png');
            temp_qrcode.pipe(require('fs').createWriteStream('./qrcode/' + pid + '.png').on('finish', function(){
            }));   

            let sqlStr2 = sql.code.add;
            let conn2 = new dbConn().getConn();
            let datetime = new Date()
            conn2.query(sqlStr2, [result[0].p_id, result[0].p_name, datetime, result[0].up_id], (err2, result2) => {
                if(err){
                    res.json(err2);
                }
                else{
                    res.json(result2)
                }
            })
            conn2.end();
        }
    });
    conn.end();	
})

module.exports = router