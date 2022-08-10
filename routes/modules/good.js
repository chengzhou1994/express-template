const db = require('../config/db')
const good = {
  // 查询货物
  getGoodList: (req, res) => {
    let username = req.body.username
    let password = req.body.password
    db.query('SELECT username FROM users where username = (?)', [username], function (err, rows) {
      console.log(err, rows)
      if (rows.length > 0) {
        data = { data: ‘’, meta: { code: ‘500’, message: ‘用户名存在’ } }
        res.send(data)
      } else {
        db.query(‘INSERT INTO`users`(`username`, `password`) VALUES(?,?)’, [username, password], function (err, rows) {
          data = { data: ‘’, meta: { code: ‘200’, message: ‘注册成功’ } }
          res.send(data)
        })
      }
    })
  }
}
module.exports = good
