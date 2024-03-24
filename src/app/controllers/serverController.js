const word = require('../models/Word')

class serverController {
    async showAll(req, res, next) {
        await word.getAll((data) => {
            res.send(data)
        })
    }
    async showOne(req, res, next) {
        await word.getOne(10, (data) => {
            res.send(data)
        })
    }

    async createOne(req, res, next) {
        await word.createWord(req.body, (infor) => {
            res.send(infor)
        })
    }

    async deleteOne(req, res, next) {
        await word.deleteWord(req.params.id, (data) => {
            res.send(data)
        })
    }
    async putOne(req, res, next) {
        await word.putWord(req.body, req.params.id, (data)=> {
            res.send(data)
        })
    }
}

module.exports = new serverController