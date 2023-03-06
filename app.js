const express = require('express')
const web = require('./routes/web')
const app = express()
const port = 3500
const connectionDB = require('./db/connectdb')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')


//database connection
connectionDB()

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







//create server
app.listen(port,()=>{
    console.log("Server started, localhost:3500")
})