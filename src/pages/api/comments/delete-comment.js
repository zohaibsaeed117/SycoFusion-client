
import connectDB from "@/middlewares/connectDB";
import Comment from "@/models/Comment";
const { ObjectId } = require('mongodb');

const handler = async (request, response) => {
    const commentId = request.body.commentId;
    var id = new ObjectId(commentId);
    try {
        
    let comment = await Comment.deleteOne({ _id: id })

    return response.status(200).json({type: "success", message: "Comment Deleted Successfully"})
    
}
catch {
        return response.status(200).json({type: "error", message: "Error while deleting the comment. Please try again"})

    }
   
}


export default connectDB(handler); 