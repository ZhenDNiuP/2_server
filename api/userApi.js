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
            console.log(result);
            res.json(result);
        }
    });
    conn.end();
});

// 查询该账户产品
router.post('/selectProductU', (req, res) => {
    let sqlStr = sql.product.selectU;
    let params = req.body;
    let conn = new dbConn().getConn();
    conn.query(sqlStr, [params.upid], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result);
            res.json(result);
        }
    });
    conn.end();
});

// 查询指定产品
router.post('/selectProductP', (req, res) => {
    let sqlStr = sql.product.selectP;
    let params = req.body;
    let conn = new dbConn().getConn();
    conn.query(sqlStr, [params.pid], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result);
            res.json(result);
        }
    });
    conn.end();
});

// 添加产品
router.post('/addProduct', (req, res) => {
    let sqlStr = sql.product.add;
    let params = req.body;
    let conn = new dbConn().getConn();

    let pid = getRandom()
    let datetime = new Date();

    conn.query(sqlStr, [pid, params.pname, params.origin, datetime, params.storage, params.transport, params.upid], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result);
            res.json(result);
        }
    });
    conn.end();
});

// 修改产品
router.post('/updateProduct', (req, res) => {
    let sqlStr = sql.product.update;
    let params = req.body;
    let conn = new dbConn().getConn();

    let datetime = new Date();

    conn.query(sqlStr, [params.pname, params.origin, datetime, params.storage, params.transport, params.pid], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result);
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
