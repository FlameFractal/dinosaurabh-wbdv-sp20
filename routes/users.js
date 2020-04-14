'use strict'

const router = require('express').Router()
const authenticate = require('../middlewares').authenticate
const UserController = require('../controllers/users')

router.post('/register', (req, res, next) => {
    UserController.register(req.body)
    .then(data => res.send({ success: true, msg: data }))
    .catch(err => res.send({ success: false, msg: err.message }))
})

router.post('/authenticate', (req, res, next) => {
    UserController.login(req.body)
    .then(data => res.send({ success: true, msg: data }))
    .catch(err => res.send({ success: false, msg: err.message }))
})

router.get('/profile', authenticate(), (req, res, next) => {
    UserController.getUserProfile(req)
    .then(data => res.send({ success: true, user: data }))
    .catch(err => res.send({ success: false, msg: err.message }))
})

module.exports = router
