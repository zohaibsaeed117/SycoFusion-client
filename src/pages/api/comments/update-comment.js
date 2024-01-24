
import connectDB from "@/middlewares/connectDB";
import Comment from "@/models/Comment";
const { ObjectId } = require('mongodb');

const handler = async (request, response) => {
    const commentId = request.body.commentId;
    const message = request.body.message;
    var id = new ObjectId(commentId);

    try {
        
    let comment = await Comment.updateOne({_id:id}, { $set: {message:message}})
    return response.status(200).json({type: "success", message: "Comment Updated Successfully"})
    
}

catch {
        return response.status(200).json({type: "error", message: "Error occured while updating your comment"})

    }
      
   
}


export default connectDB(handler); 