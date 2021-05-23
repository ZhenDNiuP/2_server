const mysql = require('mysql')

class dbConn {
  // 获取数据库连接
  getConn() {
    let conn = mysql.createConnection({
      // 数据库连接配置
      host: 'localhost',
      port: '3306',
      user: 'root', // Mysql管理员用户名
      password: 'z1581787', // Mysql管理员密码
      database: 'traceability', // 数据库名
    })
    conn.connect()
    return conn
  }
}

module.exports = dbConn
