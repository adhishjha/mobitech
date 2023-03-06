const { findById } = require('../../models/Blog')
const BlogModel = require('../../models/Blog')
const CategoryModel = require('../../models/Category')
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: 'dwrql52ck', 
    api_key: '818917953996935', 
    api_secret: 'suT3oYcR4GA82czatTtjhbL3dMc',
    // secure: true
  });


class BlogController{


        static blogList = async(req, res)=>{
            try{
                const data = await BlogModel.find()
                const category = await CategoryModel.find()
                // console.log(category)
                // console.log(data)
                res.render('admin/blog/blog-list',{d:data, c:category})
            }
            catch(error){
                console.log(error)
            }
           
        }


        static blogInsert= async (req, res)=>{
            try{
                // console.log(req.files.image)
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder: 'blogPracticeImage'
                })
                // console.log(myimage)
                const result = new BlogModel({
                    title: req.body.title,
                    category: req.body.category,
                    description: req.body.description,
                    image:{
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })

                await result.save()
                res.redirect('/admin/blogdisplay')

                
            }
            catch(error){
                console.log(error)
            }
        }


        static blogView = async (req, res)=>{

            try{
                // console.log(req.params.id)
                const result = await BlogModel.findById(req.params.id)
                // console.log(result)
                res.render('admin/blog/blog-view',{view:result})
            }
            catch(error){
                console.log(error)
            }
        }
        

        static blogDelete = async (req, res)=>{
            try{
                // console.log(req.params.id)
                const blogimage = await BlogModel.findById(req.params.id)
                const imageid = blogimage.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                await BlogModel.findByIdAndDelete(req.params.id)
                res.redirect('/admin/blogdisplay')
            }
            catch(error){
                console.log(error)
            }
        }


        static blogEdit = async (req, res)=>{
            try{
                // console.log(req.params.id)
                const allcategory = await CategoryModel.find()
                const data = await BlogModel.findById(req.params.id)
                const select = "selected"
                res.render('admin/blog/blog-edit',{edit:data, c:allcategory, select:select})

            }
            catch(error){
                console.log(error)
            }
        }


        static blogUpdate = async (req, res)=>{

            try{
                if(req.files){

                    //first delete the image
                const blog = await BlogModel.findById(req.params.id)
                const imageid = blog.image.public_id
                // console.log(imageid)
                await cloudinary.uploader.destroy(imageid)
                //second update image
                const file = req.files.image
                const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder: 'blogPracticeImage'
                })
    
                const update = await BlogModel.findByIdAndUpdate(req.params.id,{
    
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })
    
                await update.save()
                res.redirect('/admin/blogdisplay')
                }
                else{
    
                    const update = await BlogModel.findByIdAndUpdate(req.params.id,{
    
                        title: req.body.title,
                        description: req.body.description,
                        category: req.body.category
                    })
        
                    await update.save()
                    res.redirect('/admin/blogdisplay')
                }
            }
            catch(error){
                console.log(error)
            }
        }


}
module.exports = BlogController
