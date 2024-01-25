
import connectDB from "@/middlewares/connectDB";
import User from "@/models/User";
import Comment from "@/models/Comment";
const { ObjectId } = require('mongodb');

const handler = async (request, response) => {

    const userToFollow = request.body.userToFollow;
    const followingUser = request.body.followingUser;
    try {
        const personToFollow = await User.findById(userToFollow);
        const personToFollow2 = await User.findById(followingUser);
        console.log(personToFollow)
        console.log(personToFollow2)
        // 2. Update the unfollow array by adding user ID
        await personToFollow.updateOne({ $pull: { followers: followingUser } });
        
        

        // 2. Update the following array by remove user ID
        await personToFollow2.updateOne({ $pull: { following: userToFollow } });

        return response.status(200).json({type: "success", message: `You unfollowed ${userToFollow}`})
}

catch (error){
        return response.status(200).json({type: "error", message: `Error occured while unfollowing`})

    }
      
   
}


export default connectDB(handler); 