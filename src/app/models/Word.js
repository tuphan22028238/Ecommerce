const db = require('../../config/db')

class Word {
    getAll(callback) {
        db.query("SELECT * FROM wordtest", (err, word)=> {
            if (err) {
                console.log(err);
            } else {
                callback(word)
            }
        })
    }
    getOne(id, callback) {
        db.query("SELECT * FROM wordtest where idx = ? ", id, (err, data) => {
            callback(data)
        })
    }
    createWord(newWord, callback) {
        const dataToBeInsert = [newWord.wordTarget, newWord.wordMeaning]
        db.query("INSERT INTO `wordtest` (`wordTarget`, `wordMeaning`) VALUES (?, ?)", dataToBeInsert,
                (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(data)
                    }
        })
    }

    deleteWord(id, callback) {
        db.query("DELETE FROM `wordtest` WHERE `idx` = ?", [id], (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(id);
                callback(data)
            }
        })
    }

    putWord(changeWord, id, callback) {
        let sql = "UPDATE `wordtest` SET "
        let values = []
        for (const key in changeWord) {
            sql += "`" + key + "`" + " = " + `"${changeWord[key]}"` + " ,"
        }
        sql =  sql.slice(0, -1)
        sql += "WHERE `idx` = " + id
        db.query(sql , (err, data) => {
            if (err) {
                console.log(err);
            } else {
                callback(data)
            }
        })
    }
}

module.exports = new Word