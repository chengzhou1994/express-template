const crypto = require('jsonwebtoken')
const secret = 'JWT-TOKEN'
const token = {
  // 创建token
  createToken: function (obj, timeout) {
    // Token 数据
    let payload = {
      name: obj.username,
      admin: true
    }
    // 密钥

    // 签发 Token
    let tokens = crypto.sign(payload, secret, { expiresIn: 3600 })
    return tokens
  },
  // 解码token
  decodeToken: function (tokens) {
    console.log(tokens)
    let res = false
    crypto.verify(tokens, secret, function (err, decoded) {
      if (err) {
        res = { flag: false, decoded: decoded }
      } else {
        res = { flag: true, decoded: decoded }
      }
    })
    return res
  },
  // 校验token
  checkToken: function (token) {
    var resDecode = this.decodeToken(token)
    if (!resDecode) {
      return false
    }
    //是否过期
    var expState =
      parseInt(Date.now() / 1000) - parseInt(resDecode.payload.created) > parseInt(resDecode.payload.exp) ? false : true
    if (resDecode.signature === resDecode.checkSignature && expState) {
      return true
    }
    return false
  }
}
module.exports = exports = token
