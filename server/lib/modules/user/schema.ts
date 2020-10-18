import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    role: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    password: String,
    location: String,
});

export default mongoose.model('users', userSchema);