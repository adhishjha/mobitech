const CategoryModel = require('../../models/Category')

class CategoryController{


    static categoryDisplay= async (req, res)=>{
        try{
            const display = await CategoryModel.find()
            res.render('admin/category/category-list',{d:display, message:req.flash('success'), message1:req.flash('error')})
        }
        catch(error){
            console.log(error)
        }
    }


    static categoryInsert = async (req, res) =>{
        try{
            const cat_name = req.body.cat_name

            if(cat_name){
                const insert = await new CategoryModel({
                    cat_name: req.body.cat_name
                })
        
                await insert.save()
                req.flash('success','Category added successfully')
                res.redirect('/admin/categorydisplay')
            }else{
                req.flash('error','Category field is required to add a category')
                res.redirect('/admin/categorydisplay')
            }
            
        }
        catch(error){
            console.log(error)
        }
    }


    static categoryEdit = async (req, res)=>{
        try{

            const edit = await CategoryModel.findById(req.params.id)
            res.render('admin/category/edit',{e:edit})
        }
        catch(error){

        }
    }


    static categoryUpdate = async (req, res)=>{
        try{
            const cat_name = req.body.cat_name
            if(cat_name){
                const update = await CategoryModel.findByIdAndUpdate(req.params.id,{
                    cat_name: req.body.cat_name
                })
        
                await update.save()
                req.flash('success','Category updated successfully!')
                res.redirect('/admin/categorydisplay')

            }else{
                req.flash('error','Category field is required to update category')
                res.redirect('/admin/categorydisplay')
            }
            
        }
        catch(error){
            console.log(error)
        }

    }


    static categoryDelete = async (req, res) =>{
        try{
            await CategoryModel.findByIdAndDelete(req.params.id)
            req.flash('success','Category deleted successfully!')
            res.redirect('/admin/categorydisplay')
        }
        catch(error){
            console.log(error)
        }
    }


}
module.exports = CategoryController