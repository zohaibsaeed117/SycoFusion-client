
import connectDB from "@/middlewares/connectDB";
import Post from "@/models/Post";
// Score = log(Upvotes) + (Seconds / Days modifier * 8600)


const handler = async (request, response) => {
    const page = parseInt(request.body.page || 1);
    const username = request.body.username;
    const limit = 2;

    const skip = (page - 1) * limit;

    let allPosts = await Post.find({username: username});
    let postsLength = allPosts.length;
    let posts = await Post.find({ }).skip(skip).limit(limit)

    return response.status(200).json({allPostsLength: postsLength,posts: posts})
    
   
}


export default connectDB(handler); 