const express = require('express')
const router = express.Router()

const db = [
  { id: 1, name: 'AAAA' },
  { id: 2, name: 'BBBB' },
  { id: 3, name: 'CCCC' },
  { id: 4, name: 'DDDD' },
]

router.get('/', (req, res, next) => {
  const data = {
    title: 'Hello!!',
    message: 'これはサンプルで追加したデータです。',
    db,
  }
  res.render('hello', data)
})

module.exports = router