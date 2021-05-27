const express = require('express')
const router = express.Router()

const dbConn = require('../utils/dbConn');
const sql = require('../sqlMap');
const { Router, response } = require('express');

// 增加用户
router.post('/addUser', (req, res) => {
    let sqlStr = sql.user.add;
    let params = req.body;
    let conn = new dbConn().getConn();

    let uid = getRandom();
    conn.query(sqlStr, [uid, params.uname, params.phone, params.idcard, params.password], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});

// 查询用户
router.post('/selectUser', (req, res) => {
    let sqlStr = sql.user.select;
    let params = req.body;
    let conn = new dbConn().getConn();
    conn.query(sqlStr, [params.phone, params.password], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});

function getRandom(){
    var random = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,9));
    return random;
}

module.exports = router
