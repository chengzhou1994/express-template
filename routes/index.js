const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../config/db')
const token = require('../config/token')
var data = { data: '', meta: { code: '200', message: '' } }
const home = require('./modules/home')
/* GET home page. */
router.get('/getInfo', home.getInfo)

module.exports = router
