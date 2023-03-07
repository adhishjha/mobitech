const mongoose = require('mongoose')


const CategorySchema = new mongoose.Schema({
    cat_name:{
        type: String,
        required: true
    }
},{timestamps:true})


const CategoryModel = mongoose.model('category',CategorySchema) 

module.exports = CategoryModel