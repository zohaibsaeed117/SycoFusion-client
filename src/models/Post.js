import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  username: { type: String },
  title: { type: String },
  caption: { type: String },
  likes: [{ type: String }],
  isBlocked: { type: Boolean },
  postType: { type: String },
  attachments: [{
    url: {
      type: String,
      required: true
    },
    type: { // "image", "video"
      type: String,
      required: true
    }
  }],
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Post", postSchema);