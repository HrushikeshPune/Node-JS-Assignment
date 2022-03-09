const mongoose =require('mongoose');
const {Schema} =mongoose;
const userShcema =new Schema ({
    name: { type: String,  },
    email: { type: String, unique: true },
    isPromoted: {type: Boolean, default: null}
},{timestamps:true});
const User =mongoose.model('User',userShcema);

module.exports = User;
