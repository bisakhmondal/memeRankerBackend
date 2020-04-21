const router= require('express').Router();
const Meme= require('../models/Meme');

const getSortedorder=(prop)=>{
    (a,b)=>{
        if(a[prop]>b[prop]){
            return -1;
        }
        if(a[prop]<b[prop]){
            return 1;
        }
        else return 0;
    }
}

router.get('/',async (req,res)=>{
    const t= await Meme.count();
    console.log(t);
    const memelist= await Meme.find({},['name','rank','url']);
    // const resList=memelist.sort(getSortedorder('rank')).map(val=>{
    //     return {name: val.name,rank: val.rank, url: val.url}
    // });
    res.status(200).json(memelist.sort(getSortedorder('rank')));
});

router.post('/',async (req,res)=>{
    const info=new Meme({
        name:req.body.name,
        url:req.body.url,
        rank:req.body.rank
    });

    const saveInfo= await info.save();
    res.json(saveInfo);
});
module.exports=router;