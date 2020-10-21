import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    role: { type: String, enum: ["Service Desk employee", "Regular employee"], default: "Regular employee"},
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    password: String,
    location: { type: String, enum: ["Amsterdam", "Haarlem", "Knuppeldam", "HQ"], default: "Amsterdam"},
});

userSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.model('users', userSchema);