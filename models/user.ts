import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

interface IUser {
    name: string;
    email: string;
    image?: string;
    password: string;
    organization: string;
    role: string;
    subscription: string;
  }
const userSchema  = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trip: true,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowerCase: true,
    },
    image: {
        type: String,
        default: "https://placehold.co/600x400"
    },
    password: {
        type: String,

    },
    organization:{
        type: String
    },
    role:{
        type:String,
        enum: ["user", "admin"],
        default: "user"
    },
    subscription: {
        type: String
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        
    }
    next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);