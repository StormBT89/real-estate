import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,        
    },
    avatar: {
        type: String,
        default: "https://media.istockphoto.com/id/1489061272/photo/crystal-earth-on-ferns-in-green-grass-forest-with-sunlight-environment-save-the-world-earth.jpg?s=612x612&w=0&k=20&c=WVbWtdV-FrGafT5SsilWOTT8nd8_2x5EiAp8gn7jS4k="
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;

