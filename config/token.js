const crypto = require('jsonwebtoken')
const secret = 'JWT-TOKEN' //私钥

// 创建token
const createToken = (obj, timeout) => {
  // Token 数据
  let payload = {
    name: obj.username,
    admin: true
  }
  // 密钥
  // 签发 Token
  let tokens = crypto.sign(payload, secret, { expiresIn: 3600 })
  return tokens
}

// 解码token
const decodeToken = (token) => {
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
// 校验token
const checkToken = (token) => {
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

module.exports = {
  createToken,
  decodeToken,
  checkToken
}
