import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = Schema(
    {
        /* Required */
        id: { type: Number, required: true },
        content: { type: String, required: true },
        author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        postId: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },

        /* Not Required */
        parentId: { type: mongoose.Types.ObjectId, required: true, ref: 'Comment' },
        adopted: { type: Boolean },
        likes: { type: Number },
        dislikes: { type: Number },
    },
    {
        collection: 'Comment',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const exportSchema = mongoose.model('Comment', CommentSchema);

export default exportSchema;
