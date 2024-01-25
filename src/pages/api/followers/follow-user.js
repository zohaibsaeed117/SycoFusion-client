
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
        // 2. Update the followers array by adding user ID
        personToFollow.followers.push(followingUser);
    
        // 3. Save the changes to the database
        await personToFollow.save();

        

        // 2. Update the following array by adding your user ID
        personToFollow2.following.push(userToFollow);
    
        // 3. Save the changes to the database
        await personToFollow2.save();
        return response.status(200).json({type: "success", message: `You are now following ${personToFollow.username}`})
}

catch (error){
        return response.status(200).json({type: "error", message: `Error occured while following ${error}`})

    }
      
   
}


export default connectDB(handler); 