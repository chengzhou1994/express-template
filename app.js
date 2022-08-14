var createError = require('http-errors')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var expressJWT = require('express-jwt')
var logger = require('morgan')
var app = express()

//token验证
// unless 的作用为排除某些路径不需要鉴权
// express-jwt 这个中间件注册成功之后，会将用户信息绑定到req上面，可以通过req.user获取
app.use(
  expressJWT({
    secret: 'tokenSecret',
    algorithms: ['HS256'],
    credentialsRequired: false
  }).unless({
    path: ['/api/user/login', '/api/user/code', '/api/user/cellphone'] //白名单
  })
)
// 设置header头解决跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  next()
})

app.use(bodyParser.json()) // support json encoded bodies
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
