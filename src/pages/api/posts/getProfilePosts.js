
import connectDB from "@/middlewares/connectDB";
import Post from "@/models/Post";

const handler = async (request, response) => {
    const username = request.body.username;
    try {
        
    let posts = await Post.find({ username: username }).limit(5)
    return response.status(200).json({type: 'success', posts: posts})
      
}
catch(e) {
    console.log(e)
    return response.status(400).json({type: "error", message: "ERROR"})
}
   
}


export default connectDB(handler); 