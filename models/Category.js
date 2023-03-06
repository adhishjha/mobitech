const mongoose = require('mongoose')

//define schema
const CategorySchema = new mongoose.Schema({
    cat_name:{
        type: String,
        required: true
    }
},{timestamps:true})


//create collection
//blog is the name of collection
//blogschema is the field of blog collection
const CategoryModel = mongoose.model('category',CategorySchema) 

module.exports = CategoryModel