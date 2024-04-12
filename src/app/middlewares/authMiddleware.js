const jwt = require('jsonwebtoken')

const Protect = (req, res, next)=> {
    let token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'BlackRose', async(err, decoded)=> {
            if (err) {
                console.log(err);
                res.send("JWT sai")
            } else {
                console.log(decoded);
                next()
            }
        })
    } else {
        res.send("Ko co token")
    }
}

const CheckUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token,'BlackRose', async (err,decoded)=>{
            if(err)
            {
                res.locals.user = null;
                next();
            }
            else
            {
                let user = await Users.findById(decoded.id);
                res.locals.user = user.acc;
                next();
            }
        })
    }
    else
    {
        res.locals.user = null;
        next();
    }   
}

module.exports = {Protect,CheckUser};
