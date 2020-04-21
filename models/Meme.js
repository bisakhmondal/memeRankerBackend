const mongoose=require('mongoose');

const memeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        max:255
    },
    date:{
        type: Date,
        default: Date.now
    },
    rank:{
        type:Number,
        default:1400
    }
}
);

module.exports=mongoose.model('Meme',memeSchema);