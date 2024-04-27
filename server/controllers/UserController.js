const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
const {User} = require("../models");
const { signToken } = require('../helpers/jwt');
const { hashPassword, comparePassword } = require("../helpers/bcrypt")

class UserController {

    static async register (req, res,  next) {
        try {
            const {username, email, password, phoneNumber, address } = req.body
            await User.create( {username, email, password: hashPassword(password), phoneNumber, address }) 
            res.status(201).json({message: "User has successfully created"})
        } catch (error) {
            next(error)
            console.log(error);
        }
    }
    static async login (req, res, next) {
       try {
            const {email, password} = req.body
            if(!email) throw {name: "EmailRequired"}
            if(!password) throw {name: "PasswordRequired"}
            const checkEmail = await User.findOne({where : {email}})
            if(!checkEmail) throw {name: "InvalidLogin"}
            const checkPassword = comparePassword(password, checkEmail.password)
            if(!checkPassword) throw {name: "InvalidLogin"}
            const payload = {id: checkEmail.id}
            const access_token = signToken(payload)
            // console.log(access_token);
            res.status(200).json({message: "successfully login", access_token: access_token})
       } catch (error) {
            next(error)
       }
    }
    static async googleLogin(req, res, next) {
        try {
            const {google_token} = req.headers
            console.log(google_token,"--------------");
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            console.log(google_token, "token--------------------");
            const payload = ticket.getPayload();
            // const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            const [user, created] = await User.findOrCreate({where: {email: payload.email}, default: {username: payload.name, email: payload.email, password: String(Math.random() * 1000000)}})

            const access_token = signToken({id: user.id, email: user.email})
            
            res.status(200).json({access_token})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = UserController