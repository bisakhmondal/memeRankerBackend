const router= require('express').Router();
const Meme= require('../models/Meme');

router.post('/',async (req,res)=>{
    const info
    const cnt= await Meme.count();
    const rand1=Math.floor(Math.random()*cnt);
    let rand2=rand1;
    while(rand1!==rand2){
        rand2=Math.floor(Math.random()*cnt);
    }
    const meme1= await Meme.find().skip(rand1).limit(1); 
    const meme2= await Meme.find().skip(rand2).limit(1); 
    res.json({arr:[meme1,meme2]});
});