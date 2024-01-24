
import connectDB from "@/middlewares/connectDB";
import Post from "@/models/Post";
const { ObjectId } = require('mongodb');

const handler = async (request, response) => {
    const postId = request.body.postId;
    var id = new ObjectId(postId);
    try {
        
    let post = await Post.deleteOne({ _id: id })

    return response.status(200).json({type: "success", message: "Post Deleted Successfully"})
    
}
catch {
        return response.status(200).json({type: "error", message: "Error while deleting the post. Please try again"})

    }
   
}


export default connectDB(handler); 