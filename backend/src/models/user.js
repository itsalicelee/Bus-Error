
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        /* Required */
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        tag: [{ type: String, required: true }],

        /* Not Required */
        post: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
        comment: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        likedPost: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    },
    {
        collection: 'User',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const exportSchema = mongoose.model('User', UserSchema);

export default exportSchema;
