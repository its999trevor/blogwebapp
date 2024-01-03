const mongoose=require("mongoose");
const {Schema}=mongoose;
const postSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
    id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    ,
    username: String
},
    category:String, 

})
module.exports=mongoose.model("post",postSchema);

// // post.js

// postSchema.pre("findOneAndRemove", function(next) {
//     // Check if there are any pre hooks affecting deletion
//     console.log("Pre hook executed");
//     next();
// });
    