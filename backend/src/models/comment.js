import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = Schema(
    {
        /* Required */
        adopted: { type: Boolean, default: false },
        content: { type: String, required: true },
        author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    },
    {
        collection: 'Comment',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const exportSchema = mongoose.model('Comment', CommentSchema);

export default exportSchema;
