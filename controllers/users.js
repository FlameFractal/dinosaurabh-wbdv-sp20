'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Users = require('../models/users')
const config = require('../config/database')

module.exports = class UserController {
	
	static async register(document) {
		try {
			document.password = bcrypt.hashSync(document.password || '', 10)
			await new Users(document).save()
			return 'User registered'
	    } catch (err) {
	        throw new Error('Failed to register user')
	    } 
	}

	static async login(document){
		let user = await Users.findOne({ username: document.username }).lean()

		if (!user) { throw new Error('User not found') }
		if(!bcrypt.compareSync(document.password, user.password)) { throw new Error('Wrong PAssword') }

        const token = jwt.sign(user, config.secret, { expiresIn: 604800 })

        return {
            success: true,
            token: `Bearer ${token}`,
            user: {
              id: user._id,
              username: user.username,
              email: user.email
            }
        }
	}

	static async getUserProfile(req){
		return req.user
	}

}
