import connectDB from "@/middlewares/connectDB";
import User from "@/models/User";
var jwt = require("jsonwebtoken");

const handler = async (request, response) => {
    const username = request.body.username;
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const age = request.body.age;
    const email = request.body.email;
    const role = request.body.role;
    const skills = request.body.skills;
    const avatar = request.body.avatar;
    const socialLinks = request.body.socialLinks;

    //converting string to array
    const skillsArr = skills.split(",");

   try {
    let user = await User.updateOne({username:username}, { $set: {firstName:firstName, lastName: lastName, age: age,email:email,role:role, skills:skills, avatar: avatar,socialLinks:socialLinks }})
    var token = jwt.sign({username: username, firstName:firstName, lastName:lastName, avatar: avatar}, process.env.NEXT_PUBLIC_JWT_TOKEN);
    return response.status(200).json({type: "success", message: "Profile Updated Successfully", token: token})
    
}

catch(e) {
        return response.status(200).json({type: "error", message: `Error occured while updating your profile Reason: ${e}`})

    }
      
   
}


export default connectDB(handler); 