import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  username: { type: String },
  message: { type: String },
  isReply: { type: String },
  replyTo: { type:String },
  postId: { type: String }
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Comment", commentSchema);