var createError = require('http-errors')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var logger = require('morgan')
var indexRouter = require('./routes/index')// 接口api
var app = express()

// 配置session，具体配置请查看express-session文档
app.use(
  session({
    secret: 'yoursecret', // 密钥
    name: 'nodeapp', // cookie的name，默认为connect.sid
    cookie: { maxAge: 1800000 }, // cookie有效期时间
    resave: false, // 强制session保存到session store中。即使在请求中这个session没有被修改
    saveUninitialized: true // 强制没有“初始化”的session保存到storage中
  })
)

// 设置header头解决跨域问题
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(indexRouter)
app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
