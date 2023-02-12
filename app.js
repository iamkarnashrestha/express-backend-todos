const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors=require('cors')

const usersRouter=require('./routers/usersRouter')
const todosRouter=require('./routers/todosRouter')
const {checkToken}=require('./middlewares/checkToken')

const { DB_SERVER } = require("./config.json");
mongoose
  .connect(DB_SERVER, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db Connected"))
  .catch((e) => console.log(e));


  const app=express();
  app.use(morgan('dev'));
  app.use(cors())
  app.use(express.json())

//routes

app.use('/api/users/',usersRouter);
app.use('/api/todos/',checkToken,todosRouter)




  app.all('*',async(req,res,next)=>{
    next(new Error(`No Route found`))
  })

  app.use(function(err,req,res,next){
    res.status(400).json({success:false, data:err.message})
  })
  app.listen(3001,()=> console.log(`Listening on 3001`))