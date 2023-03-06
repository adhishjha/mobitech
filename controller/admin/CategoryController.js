const CategoryModel = require('../../models/Category')

class CategoryController{


    static categoryDisplay= async (req, res)=>{
        try{
            const display = await CategoryModel.find()
            res.render('admin/category/category-list',{d:display})
        }
        catch(error){
            console.log(error)
        }
    }


    static categoryInsert = async (req, res) =>{
        try{
            const insert = await new CategoryModel({
                cat_name: req.body.cat_name
            })
    
            await insert.save()
            res.redirect('/admin/categorydisplay')
        }
        catch(error){
            console.log(error)
        }
    }


    static categoryEdit = async (req, res)=>{
        try{
            // console.log(req.params.id)
            const edit = await CategoryModel.findById(req.params.id)
            res.render('admin/category/edit',{e:edit})
        }
        catch(error){

        }
    }


    static categoryUpdate = async (req, res)=>{
        try{
            // console.log(req.params.id)
            const update = await CategoryModel.findByIdAndUpdate(req.params.id,{
                cat_name: req.body.cat_name
            })
    
            await update.save()
            res.redirect('/admin/categorydisplay')
        }
        catch(error){
            console.log(error)
        }

    }


    static categoryDelete = async (req, res) =>{
        try{
            await CategoryModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/categorydisplay')
        }
        catch(error){
            console.log(error)
        }
    }


}
module.exports = CategoryController