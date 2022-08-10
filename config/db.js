// 为什么使用线程池不适用createConnection是为了解决PROTOCOL_CONNECTION_LOST异常和PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR异常
// mysql连接断开，没有做异常处理，导致错误的代码继续在运行, 导致node没有结束进程
const mysql = require('mysql')

const pool = mysql.createPool({
  host: 'localhost', //数据库ip
  user: 'root', //用户名
  password: 'Admin@123', //密码
  database: 'admin_db', //数据库库名
  port: '3306' //端口号
})

exports.query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(sql, params, (err, result) => {
        // 释放连接
        // pool.releaseConnection(connection)
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
      //这么设置，能够解决卡死问题
      connection.release()
    })
  })
}
