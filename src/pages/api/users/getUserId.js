import Comment from "@/models/Comment";
import connectDB from "@/middlewares/connectDB";
import User from "@/models/User";

const handler = async (req, res) => {
  const username = req.body.username;
  if (req.method == "POST") {
      try {
  
   const user = await User.findOne({username: username});
   
   res.status(200).json({type: "success", user: user, message: `Done`})
   
           
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