const router= require('express').Router();
const Meme= require('../models/Meme');

const getWeight=(rank,win)=>{
    if(win){
        if(rank<=1200)
        return 40;
        if(rank>1200 && rank<=1800)
        return 25;
        if(rank>=1800 && rank<2400)
        return 15;
        if(rank>=2800)
        return 10;
    }
    else{
        if(rank<=1200)
        return 10;
        if(rank>1200 && rank<=1800)
        return 15;
        if(rank>=1800 && rank<2400)
        return 25;
        if(rank>=2400)
        return 40; 
    }
}
router.post('/',async (req,res)=>{
    const cnt= await Meme.estimatedDocumentCount();
    const rand1=Math.floor(Math.random()*cnt);
    let rand2=rand1;
    while(rand1===rand2){
        rand2=Math.floor(Math.random()*cnt);
    }
    const meme1= await Meme.find().skip(rand1).limit(1); 
    const meme2= await Meme.find().skip(rand2).limit(1); 
    res.json({arr:[meme1,meme2]});
});
router.put('/',async (req,res)=>{
   const doc1=req.body.player;
   const doc2=req.body.opponent;
   let rankdiff=doc2.rank-doc1.rank;
   if(rankdiff>=400){
       rankdiff=100;
   }else if(rankdiff<=-400){
       rankdiff=-100;
   }
   const Exp1 = 1/(1+Math.pow(10,(rankdiff)/400));
   let rank1,rank2;
   if(req.body.winner==='1'){
        rank1=doc1.rank+getWeight(doc1.rank,true)*(1-Exp1);
        rank2=doc2.rank+getWeight(doc2.rank,false)*(0-(1-Exp1));
   }else{
    rank1=doc1.rank+getWeight(doc1.rank,false)*(0-Exp1);
    rank2=doc2.rank+getWeight(doc2.rank,true)*(1-(1-Exp1));
   }
   const update1=await Meme.findByIdAndUpdate({_id:doc1._id},{$set:{rank:Math.floor(rank1)}});
   const update2=await Meme.findByIdAndUpdate({_id:doc2._id},{$set:{rank:Math.floor(rank2)}});
   res.json([update1,update2]);
});

module.exports=router;
