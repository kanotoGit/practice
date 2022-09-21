const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const data = {
    title: 'API',
    message: '',
    uid: '',
    password: '',
  }
  res.render('form', data)
})

router.post('/', (req, res, next) => {
  const data = {
    title: 'フォームページ',
    message: `${req.body.uid}さんのパスワードは${req.body.password}です。`,
    uid: req.body.uid,
    password: req.body.password,
  }
  res.render('index', data)
})

module.exports = router