const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser= require('body-parser');
require('dotenv/config');
const mainRouter= require('./routes/main');
app.use(bodyParser.json());
app.use('/main',mainRouter);

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true ,useUnifiedTopology: true},(err)=>{
    if(err) console.log(err);
    else console.log('connected to DB');
});

mongoose.connection.useDb('meme');

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log("app Running"));