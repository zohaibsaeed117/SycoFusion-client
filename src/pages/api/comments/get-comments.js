
import connectDB from "@/middlewares/connectDB";
import Comment from "@/models/Comment";

const handler = async (request, response) => {
    try {
        
        const postId = request.body.postId;
    let comments = await Comment.find({ postId: postId })
    console.log(comments)
    return response.status(200).json({type: 'success', comments: comments})
      
}
catch(e) {
    console.log(e)
    return response.status(400).json({type: "error", message: "ERROR"})
}
   
}


export default connectDB(handler); 