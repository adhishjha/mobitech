const jwt = require('jsonwebtoken')
const AdminModel = require('../models/admin')



const auth =  async (req, res, next) =>{

    try{
        const {token} = req.cookies
        const verifytoken = jwt.verify(token, process.env.SECRET_KEY)
        const admindata = await AdminModel.findOne({_id: verifytoken.id})
        req.admindetail = admindata
        next()

    }
    catch(error){
        res.redirect('/login')
    }


}
module.exports = auth