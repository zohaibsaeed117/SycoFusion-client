
import connectDB from "@/middlewares/connectDB";
import User from "@/models/User";
import Comment from "@/models/Comment";
const { ObjectId } = require('mongodb');

const handler = async (request, response) => {

    const checkForUser = request.body.checkForUser;
    const followingUser = request.body.followingUser;
    console.log("Check Follow");
    console.log(checkForUser, followingUser)
    try {
        const targetUserId = new ObjectId(checkForUser);
        const followerUserId = new ObjectId(followingUser);
        console.log(targetUserId, followerUserId)
        const targetUser = await User.findOne({
            _id: targetUserId,
            followers: { $in: [followerUserId] }
        });
        console.log(targetUser)
        if (targetUser) {
            return response.status(200).json({ isFollow: true, type: "success", message: `You are following ${checkForUser}` });
        } else {
            return response.status(200).json({ isFollow: false, type: "error", message: `You are not following ${checkForUser}` });
        }
}

catch (error){
        return response.status(200).json({type: "error", message: `Error occured while following ${error}`})

    }
      
   
}


export default connectDB(handler); 