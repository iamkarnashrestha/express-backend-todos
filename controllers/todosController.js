const todosModel = require("../models/todosModel")


module.exports.getAllTodos=async(req,res,next)=>{
    try {
        const {user_id}=req.token
        const results=await todosModel.find({user_id})
        res.json({success:true, results})
    } catch (error) {
        next(error)
    }
}



module.exports.addNewTodo=async(req,res,next)=>{
    try {
        const {user_id}=req.token
        const new_todo=req.body
        console.log(req.body)
        const results=await todosModel.create({
            ...new_todo,user_id
        })
        res.json({success:true, results})
    } catch (error) {
        next(error)
    }
}


module.exports.getTodoById=async(req,res,next)=>{
    try {
        const {user_id}=req.token
        const {todo_id}=req.params
        const todo=await todosModel.findOne({_id:todo_id,user_id})
        res.json({success:true, results:todo})
    } catch (error) {
        next(error)
    }
}



module.exports.updateTodo=async(req,res,next)=>{
    try {
        const {user_id}=req.token
        const {todo_id}=req.params
        const {title,description,completed}=req.body
        console.log(title)
        console.log(req.body)
        const results=await todosModel.updateOne({_id:todo_id,user_id},
            {
                $set:{title,description,completed}
            }
            )
        res.json({success:true, results})
    } catch (error) {
        next(error)
    }
}



module.exports.deleteTodo=async(req,res,next)=>{
    try {
        const {user_id}=req.token
        const {todo_id}=req.params
        const results=await todosModel.deleteOne({_id:todo_id,user_id})
        res.json({success:true, results})

    } catch (error) {
        next(error)
    }
}

 