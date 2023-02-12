const express =require('express')
const router =express.Router()
const {getAllTodos,addNewTodo,getTodoById,updateTodo,deleteTodo}=require('../controllers/todosController')

router.get('/',getAllTodos)
router.post('/',addNewTodo)
router.get('/:todo_id',getTodoById)
router.put('/:todo_id',updateTodo)
router.delete('/:todo_id',deleteTodo)

module.exports=router;