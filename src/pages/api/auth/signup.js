
import User from "@/models/User"
import connectDB from "@/middlewares/connectDB";
import bcrypt from "bcryptjs";
const handler = async (req, res) => {
    console.log("DONE")
    if (req.method == "POST") {
try{
            const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(req.body)
        let user = new User({
            email: req.body.email,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            // role: req.body.role,
            // skills: req.body.skills,
            password: hashedPassword,
            isBlocked: false,
            isAdmin: false,
            avatar: ""
        })
    
        await user.save();
        return res.status(200).json({type: "success", message: "Your account has been created successfully." })
    }
        catch(err) {
            return res.status(200).json({type: "error", message: `${err.code}`, errorCode: err.code })
        }
   
    }
    
    else {
        return res.status(200).json({type: "error", message: "ERROR occured while creating your account. Please try again." })
    }
}


export default connectDB(handler); 