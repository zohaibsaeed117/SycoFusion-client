import mongoose from 'mongoose';
const { Schema } = mongoose;

const users = new Schema({
  username: { type: String, unique:true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  avatar: { type: String },
  password: { type: String },
  role: {type: String},
  skills: {type: String},
  isBlocked: { type: Boolean },
  isAdmin: { type: Boolean },
  socialLinks: [{
    url: {type: String},
    name: {type: String}
  }],
  fusions:  [{
    username: {
      type: String,
      required: true
    },
    streakCount: {
      type: Number
    }
  }],
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("User", users);