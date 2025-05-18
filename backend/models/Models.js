import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password : {
        type: String,
        required: true,
        set : (password) => { return bcrypt.hashSync(password, 10) },
        get : (password) => { return bcrypt.compareSync(password, this.password) }
    },
    created_at : {
        type: Date,
        default : Date.now
    }
},{ timestamps: true });

const BlogSchema = new Schema ({
    title: {
        type: String,
        required: true,
        trim: true,
        default: 'Untitled Draft',
    },
    content : {
      type: String,
      required: true,
      trim: true,
    },
    tags : {
      type: [String],
      default: [],
    },
    status : {
        type: String,
        enum : ['draft', 'published'],
        required: true,
        default: 'draft',
    },
    created_at : {
        type: Date,
        default : Date.now
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{ timestamps: true
});

// Add indexes to improve query performance
// For UserSchema
UserSchema.index({ email: 1 }, { unique: true });

// For BlogSchema
BlogSchema.index({ author: 1 });
BlogSchema.index({ status: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ created_at: -1 });

// Create models

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);

export {
    User,
    Blog
};