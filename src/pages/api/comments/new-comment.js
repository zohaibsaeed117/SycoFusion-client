import Comment from "@/models/Comment";
import connectDB from "@/middlewares/connectDB";

const handler = async (req, res) => {
  const username = req.body.username;
  const message = req.body.message;
    const isReply = req.body.isReply;           
    const replyTo = req.body.replyTo;
    const postId = req.body.postId;
    console.log(req.body);
    if (req.method == "POST") {
    try {
        let comment = new Comment({
            postId: postId,
            username: username,
            message: message,
            isReply: isReply,
            replyTo: replyTo    
            })
                const result = await comment.save();
    
               
            res.status(200).json({type: "success", message: "Comment Added Successfully", result: result})
           
    }  
    catch(e) {
        res.status(400).json({type: "error", message: `ERROR. ${e}`})
    } 
    }

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

export default connectDB(handler);