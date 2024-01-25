
import connectDB from "../../../middlewares/connectDB";
import Post from "../../../models/Post";
// Score = log(Upvotes) + (Seconds / Days modifier * 8600)


const handler = async (request, response) => {
    const page = parseInt(request.body.page || 1);
    const limit = 5;

    const skip = (page - 1) * limit;

    let allPosts = await Post.find({});
    let postsLength = allPosts.length;
    let posts = await Post.find({ }).skip(skip).limit(limit)

    return response.status(200).json({allPostsLength: postsLength,posts: posts})
    
   
}


export default connectDB(handler); 