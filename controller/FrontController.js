const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/Category')
const AboutModel = require('../models/about')

class FrontController{

    
    static home = async(req, res)=>{
        
        try{
            const blogs = await BlogModel.find().sort({_id:-1}).limit(6)
            res.render('home',{b:blogs})
        }
        catch(error){
            console.log(error)
        }
    }

    static about = async (req, res)=>{
        try{
            const about = await AboutModel.findOne()
            res.render('about',{a:about})
        }
        catch(error){
            console.log(error)
        }
    }

    static contact= (req, res) =>{
        res.render('contact',{message:req.flash('success'), message1:req.flash('error')})
    }

    static blog = async (req, res) =>{
        try{
            const blogs = await BlogModel.find().sort({_id:-1})
            res.render('blog',{b:blogs})
        }
        catch(error){
            console.log(error)
        }
    }

    static login = async (req, res) => {
        try{
            res.render('login',{message:req.flash('success'), message1:req.flash('error')})
        }
        catch(error){
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try{
            res.render('register',{message:req.flash('error')})
        }
        catch(error){
            console.log(error)
        }
    }

    static blogDetail = async (req, res) =>{
        try{
            
            const detail = await BlogModel.findById(req.params.id)
            const recentblogs = await BlogModel.find().sort({_id:-1}).limit(6)
            const category = await CategoryModel.find()
            res.render('blog-detail',{d:detail, r:recentblogs, c:category})
        }
        catch(error){
            console.log(error)
        }
    }

    static category = async (req, res) =>{

        try{
            const categoryname = req.params.categoryname
            const categorydetail = await BlogModel.find({category:categoryname})
            res.render('category',{cd:categorydetail, cn:categoryname.toUpperCase()},)
        }
        catch(error){
            console.log(error)
        }
    }


}
module.exports = FrontController