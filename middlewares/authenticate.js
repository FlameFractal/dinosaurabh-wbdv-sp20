'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config/database')

module.exports = () => {
	return (req, res, next) => {
		try {
			let token = (req.headers.authorization||'').replace('Bearer ','').trim()
			let result = jwt.verify(token, config.secret)

			// remove unncessary fields
			;['password', 'iat', 'exp', '__v'].forEach(key => delete result[key])

			// attach user object to request
			req.user = result
			next()

		} catch (err) {
			res.send({ success: false, msg: 'Unauthorized' })
			throw err
		}
	}
}
