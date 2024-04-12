const user = require("../models/User")
const jwt = require('jsonwebtoken')

const maxAge = 1*60*24*24;
const createToken = (id) =>{
    return jwt.sign({ id },'BlackRose',{
        expiresIn: maxAge
    });
}

class authController {
    login(req, res, next) {
        let userInfor = user.login(req.body , (data) => {
            if (data.length != 0) {
                const token = createToken(data.id)
                res.cookie('jwt', token, {httpOnly: true})
                console.log(data[0].id);
                res.locals.user = data[0].id
                res.send("Ok login successful")
            } else {
                res.send("Login fail")
            }
        })
    }

    register(req, res, next) {
        let userInforRegis = user.register(req.body, (data) => {
            console.log(data);
            if (data.length != 0) {
                res.send("Sign up success");
            } else {
                res.send("Sign up fail");
            }
        })
    }

    async showAllUser(req, res, next) {
        let fullUser = user.showAllUser((data) => {
            console.log(res.locals.user);
            res.send(data)
        })
    }
}

module.exports = new authController