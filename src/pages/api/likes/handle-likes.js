import Post from "@/models/Post";
import connectDB from "@/middlewares/connectDB";
const { ObjectId } = require('mongodb');

const handler = async (request, response) => {
    if (request.method == "POST") {
        const postId = request.body.postId;
    var id = new ObjectId(postId);
    let likeUsername = request.body.likeUsername;
    let check = await Post.findOne({ _id: id,likes: likeUsername})
    if (check == null) {
        await Post.updateOne({_id: id}, {$push:{"likes":likeUsername}});
        return response.status(200).json({type: "success", liked: true, message: "Post Liked"})
    }
    else {
        await Post.updateOne({_id: id}, { $pull: { "likes": likeUsername }});
        return response.status(200).json({type: "success",liked: false, message: "Post Disliked"})
    }
   
}
else {
        return response.status(403).json({type: "error", message: "Method not Allowed"})
    }
}


export default connectDB(handler); 