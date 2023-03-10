const AboutModel = require('../../models/about')


class AboutController{


    static aboutDisplay = async (req, res)=>{
        try{
            const result = await AboutModel.findOne()
            res.render('admin/about/about-list',{a:result, message:req.flash('success')})
        }
        catch(error){
            console.log(error)
        }
    }

    static aboutEdit = async (req, res)=>{
        try{
            const edit = await AboutModel.findById(req.params.id)
            req.flash('success','About details updated successfully!')
            res.render('admin/about/edit',{e:edit})
        }
        catch(error){
            console.log(error)
        }
    }


    static aboutUpdate = async (req, res) =>{
        try{
            
            const update = await AboutModel.findByIdAndUpdate(req.params.id,{
                about: req.body.about
            })

            await update.save()
            res.redirect('/admin/aboutdisplay')
        }
        catch(error){
            console.log(error)
        }
    }




}
module.exports = AboutController