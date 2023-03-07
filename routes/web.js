const express = require('express')
const AboutController = require('../controller/admin/AboutController')
const AdminController = require('../controller/admin/AdminController')
const BlogController = require('../controller/admin/BlogController')
const CategoryController = require('../controller/admin/CategoryController')
const ContactController = require('../controller/admin/ContactController')
const FrontController = require('../controller/FrontController')
const auth = require('../middleware/auth')
const router = express.Router()





//Frontcontroller
router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/blog',FrontController.blog)
router.get('/blog-detail/:id',FrontController.blogDetail)
router.get('/login',FrontController.login)
// router.get('/register',FrontController.register)
router.get('/category/:categoryname',FrontController.category)


//admincontroller
router.get('/admin/dashboard',auth,AdminController.dashboard)
router.post('/adminregister',AdminController.register)
router.post('/verifylogin',AdminController.verifyLogin)
router.get('/logout',auth,AdminController.logout)


//blogcontroller
router.get('/admin/blogdisplay',auth,BlogController.blogList)
router.post('/bloginsert',BlogController.blogInsert)
router.get('/admin/blogview/:id',auth,BlogController.blogView)
router.get('/admin/blogedit/:id',auth,BlogController.blogEdit)
router.post('/blogupdate/:id',BlogController.blogUpdate)
router.get('/admin/blogdelete/:id',auth,BlogController.blogDelete)


//categorycontroller
router.get('/admin/categorydisplay',auth,CategoryController.categoryDisplay)
router.post('/categoryinsert',CategoryController.categoryInsert)
router.get('/admin/categoryedit/:id',auth,CategoryController.categoryEdit)
router.post('/categoryupdate/:id',CategoryController.categoryUpdate)
router.get('/admin/categorydelete/:id',auth,CategoryController.categoryDelete)



//contactcontroller
router.get('/admin/contactdisplay',auth,ContactController.contactDisplay)
router.post('/contactinsert',ContactController.contactInsert)



//aboutcontroller
router.get('/admin/aboutdisplay',auth,AboutController.aboutDisplay)
router.get('/admin/aboutedit/:id',auth,AboutController.aboutEdit)
router.post('/aboutupdate/:id',AboutController.aboutUpdate)




module.exports = router