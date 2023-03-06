const ContactModel = require('../../models/contact')

class ContactController{



    static contactInsert = async (req, res) =>{
        try{
            const insert = await new ContactModel({

                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message

            })

            await insert.save()
            res.redirect('/contact')

        }
        catch(error){
            console.log(error)
        }
    }



    static contactDisplay = async (req, res)=>{
        try{
            const display = await ContactModel.find()
            // console.log(display)
            res.render('admin/contact/contact-list',{d:display})
        }
        catch(error){
            console.log(error)
        }
    }




}
module.exports = ContactController