const db = require('../../config/db')

class User {
    async login(information) {
        const {account, password} = information
        let user
        db.query("SELECT * FROM `user` WHERE `account` = " + `"${account}"` + "AND `password` =  " + `"${password}"`,
         (err, data) => {
            if (err) {
                console.log(err)
                return user
            }
            user = data
         })
        return user
    } 
}

module.exports = new User