const http = require('http')
const bodyparser = require('body-parser')
const express = require('express')
const userApi = require('./api/userApi')
const productApi = require('./api/productApi')
const codeApi = require('./api/codeApi')
const dbConn = require('./utils/dbConn')

const app = express()
let server = http.createServer(app)

app.use(bodyparser.json()),
app.use(bodyparser.urlencoded({
    extended: false
}))

app.use(express.static('qrcode'));

app.use('/api/user', userApi),
app.use('/api/product', productApi),
app.use('/api/code', codeApi),

server = app.listen(8081,function(){
    console.log("success");
})