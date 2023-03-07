const express = require('express')
const web = require('./routes/web')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const connectionDB = require('./db/connectdb')
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')




//database connection
connectionDB()


//cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


//use for get the token from browser
app.use(cookieParser())


//to convert url data in json form
app.use(express.urlencoded({extended:false}))


//for file upload
app.use(fileUpload({useTempFiles : true}));


//for flash message
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  }));
  
app.use(flash());


//router load
app.use('/',web)



//template engine
app.set('view engine', 'ejs')



//used for static files
app.use(express.static('public'))



app.get('*', (req, res)=>{
  res.render('404')
})



//create server
app.listen(port,()=>{
    console.log("Server started")
})