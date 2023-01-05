import jwt from 'jsonwebtoken';

import Tag from './models/tag';
import User from './models/user';
import Post from './models/post';
import Comment from './models/comment';
import tagData from './data/tags.json';

exports.validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            valid: true,
            userId: decoded.id,
        };
    } catch (err) {
        return {
            valid: false,
            message: err.message,
        };
    }
}

exports.dataInit = async () => {
    
    console.log("==============================");
    console.log("Resetting Database");

    console.log("------------------------------");
    console.log("1-1. Removing Tags...");
    await Tag.deleteMany({});
    console.log("1-2. Inserting Tags...");
    await Tag.insertMany(tagData);
    console.log("     Done!");

    console.log("------------------------------");
    console.log("2. Removing Posts...");
    await Post.deleteMany({});
    console.log("   Done!");

    console.log("------------------------------");
    console.log("3. Removing Comments...");
    await Comment.deleteMany({});
    console.log("   Done!");

    console.log("------------------------------");
    console.log("4. Removing Users...");
    await User.deleteMany({});
    console.log("   Done!");

    console.log("------------------------------");
    console.log("Finished!");
    console.log("==============================");
}
