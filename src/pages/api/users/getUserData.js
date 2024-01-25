
import connectDB from "@/middlewares/connectDB";
import User from "@/models/User";
import Post from "@/models/Post";

const handler = async (req, res) => {
  const username = req.body.username;
  console.log(username)
  if (req.method == "POST") {
      try {
  
   const user = await User.findOne({username: username});
   console.log(user)
    const posts = await Post.find({username: username})
    const postsLength = posts.length;

    const data = {
       user: user,
        posts: postsLength
    }
   res.status(200).json({type: "success", message: `Done`, data: data})
   
           
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