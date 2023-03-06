const AdminModel = require('../../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AdminController{


    static dashboard = async (req, res) => {
        try{
            const {name,email} = req.admindetail
            res.render('admin/dashboard',{n:name, e:email})
        }
        catch(error){
            console.log(error)
        }
    }

    static register = async (req, res) =>{
        // console.log(req.body)

        try{
            const {name,email,password,confirmpassword} = req.body
            const admin = await AdminModel.findOne({email:email})

            if(admin){
                req.flash('error','Email already exists')
                res.redirect('/register')
            }else{
                if(name && email && password && confirmpassword){
                    if(password == confirmpassword){

                        const hashpassword = await bcrypt.hash(password,10)
                        const register = await new AdminModel({
                            name: name,
                            email: email,
                            password: hashpassword
                        })
                        await register.save()

                        req.flash('success','Register successfully! Please login')
                        res.redirect('/login')

                    }else{
                        req.flash('error','Password and confirm password doesnot match')
                        res.redirect('/register')
                    }
                }else{
                    req.flash('error','All fields are required')
                    res.redirect('/register')
                }
            }

        }
        catch(error){
            console.log(error)
        }
    }


    static verifyLogin = async (req, res) =>{
        try{
            const {email,password} = req.body

            if(email && password){
                const admin = await AdminModel.findOne({email:email})

                if(admin != null){
                    const ismatched = await bcrypt.compare(password, admin.password)

                    if(ismatched){
                        //token generate
                        const token = jwt.sign({ id: admin._id }, 'adhishpninfosyscandidate08');
                        // console.log(token)
                        res.cookie('token',token)
                        res.redirect('/admin/dashboard')
                    }else{
                        req.flash('error','Email or password is incorrect')
                        res.redirect('/login')
                    }
                }else{
                    req.flash('error','You are not registered')
                    res.redirect('/login')
                }
            }else{
                req.flash('error','All fields are required')
                res.redirect('/login')
            }
        }
        catch(error){
            console.log(error)
        }
    }


    static logout = async (req, res) =>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        }
        catch(error){
            console.log(error)
        }
    }


}
module.exports = AdminController