const mongoose=require('mongoose')
const TodoSchema=mongoose.Schema({
    title:String,
    description:String,
    user_id:mongoose.Types.ObjectId,
    completed:{type:Boolean,default:false}
},{timestamps:true})

module.exports=mongoose.model('Todo',TodoSchema)