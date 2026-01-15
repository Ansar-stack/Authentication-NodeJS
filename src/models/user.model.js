import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        lowercase: true
    },
    email: {
        type:String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    }, 
    refreshToken: String,
    passwordToken: String, 
    expirePasswordToken: {
        type: Date
    }
});

// Hash password before saving
userSchema.pre('save', async function(){
    if(!this.isModified('password'))return
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword;
});
// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

export const User =  mongoose.models.User || mongoose.model('User', userSchema)
