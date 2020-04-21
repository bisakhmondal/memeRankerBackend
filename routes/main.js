const router= require('express').Router();
const Meme= require('../models/Meme');

const getSortedorder=(prop)=>{
    (a,b)=>{
        if(a[prop]>b[prop]){
            return 1;
        }
        if(a[prop]<b[prop]){
            return -1;
        }
        else return 0;
    }
}

router.get('/',async (req,res)=>{
    const memelist= await Meme.find();
    const resList=memelist.sort(getSortedorder('rank')).forEach(val=>{
        delete val.date;
        delete val._id;
        delete val.__v;
    });
    res.status(200).json(resList);
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