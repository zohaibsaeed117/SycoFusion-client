
import connectDB from "@/middlewares/connectDB";
import Post from "@/models/Post";
const { ObjectId } = require('mongodb');

const handler = async (request, response) => {
    const postId = request.body.postId;
    const caption = request.body.caption;
    const title = request.body.title;
    const postType = request.body.postType;
    var id = new ObjectId(postId);

    try {
        
    let post = await Post.updateOne({_id:id}, { $set: {caption:caption, title: title, postType: postType}})
    return response.status(200).json({type: "success", message: "Post Updated Successfully"})
    
}

catch {
        return response.status(200).json({type: "error", message: "Error occured while updating your post"})

    }
      
   
}


export default connectDB(handler); 