const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser= require('body-parser');
require('dotenv/config');

const mainRouter= require('./routes/main');
const rankRouter= require('./routes/rank');
app.use(bodyParser.json());
app.use(cors());
app.use('/main',mainRouter);
app.use('/rank',rankRouter);

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true ,useUnifiedTopology: true},(err)=>{
    if(err) console.log(err);
    else console.log('connected to DB');
});

mongoose.connection.useDb('meme');

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log("app Running"));