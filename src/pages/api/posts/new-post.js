

import Post from "@/models/Post";
import connectDB from "@/middlewares/connectDB";

const handler = async (req, res) => {
    const username = req.body.username;
    const caption = req.body.caption;
    const title = req.body.title;
    const postType = req.body.postType;
    const attachments = req.body.attachments;
    console.log(req.body);
    if (req.method == "POST") {
        let post = new Post({
            title: title,
            username: username,
            caption: caption,
            likes: [],
            isBlocked: false,
            postType: postType,
            attachments: attachments
            })
            const result = await post.save();

            const id = result._id; 
        res.status(200).json({type: "success", message: "Post Published Successfully", id: id})
       }

    else {
        res.status(400).json({type: "error", message: "ERROR. "})
    }
}

export default connectDB(handler);