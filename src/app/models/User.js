const db = require('../../config/db')

class User {
    async login(information, callback) {
        const {username, password} = information
        db.query("SELECT * FROM `user` WHERE `username` = " + `"${username}"` 
                + "AND `password` =  " + `"${password}"`,
         (err, data) => {
            if (err) {
                console.log(err)
            }
            callback(data)
         })
    } 

    register(information, callback) {
        const {username, password} = information
        db.query("INSERT INTO `user` (`username`, `password`) VALUES " + `("${username}" , "${password}")`, 
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    callback(data)
                }
        })
    }

    showAllUser(callback) {
        db.query("SELECT * FROM `user`", (err, data) =>{
            callback(data)
        })
    }

    getUserId(callback) {
        db.query("SELECT * FROM `user`", (err, data) =>{
            callback(data)
        })
    }
    
    async getUserId(userId, callback) {
        try {
            const query = "SELECT * FROM `user` WHERE `id` = ?";
            const data = await db.query(query, [userId]);
            callback(data);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new User