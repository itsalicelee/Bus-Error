import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = Schema(
    {
        /* Required */
        id: { type: Number, required: true },
        author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        tag: [{ type: String, required: true }],
        topic: { type: String, required: true },
        content: { type: String, required: true },

        /* Not Required */
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        dislikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        comment: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        views: { type: Number },
    },
    {
        collection: 'Post',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const exportSchema = mongoose.model('Post', PostSchema);

export default exportSchema;
