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
            req.flash('success','Thanks for contacting us! We will be in touch with you shortly.')
            res.redirect('/contact')

        }
        catch(error){
            req.flash('error','Please fill in all contact details')
            res.redirect('/contact')
            console.log(error)
        }
    }



    static contactDisplay = async (req, res)=>{
        try{
            const display = await ContactModel.find()
            res.render('admin/contact/contact-list',{d:display})
        }
        catch(error){
            console.log(error)
        }
    }




}
module.exports = ContactController