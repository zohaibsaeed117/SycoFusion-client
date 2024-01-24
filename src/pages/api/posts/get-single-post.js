
import connectDB from "@/middlewares/connectDB";
import Post from "@/models/Post";
const { ObjectId } = require('mongodb');

const handler = async (request, response) => {
    const postId = request.body.postId;
    var id = new ObjectId(postId);

    let post = await Post.find({ _id: id })
    console.log(post)
    return response.status(200).json({post: post})
      
   
}


export default connectDB(handler); 