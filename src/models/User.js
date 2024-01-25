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
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("User", users);