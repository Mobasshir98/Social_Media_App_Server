require('dotenv').config()
const express=require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors')
const postroutes=require('./routes/post')
const userRoutes = require('./routes/users')

const app = express();
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors());
app.use('/posts',postroutes)
app.use('/users',userRoutes)
 
const PORT = process.env.PORT||5000;

mongoose.connect(process.env.MONGODB_URL||process.env.CONNECTION_URL).then(()=>app.listen(PORT,()=>{
    console.log(`Server running on : ${PORT} `)
})).catch((err)=>console.log(err.message))
 
  