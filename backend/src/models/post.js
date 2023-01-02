import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const PostSchema = Schema(
    {
        /* Required */
        post_id: { type: Number, default: uuidv4, required: true },
        post_author: { type: mongoose.Types.ObjectId, required: true, ref: 'Tag' },
        post_tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
        post_topic: { type: String, required: true },
        post_fbody: { type: String, required: true },
        post_sbody: { type: String, required: true },

        /* Not Required */
        post_like: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        post_dislike: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        post_comment: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        post_commentHasAdopt: { type: Boolean },
        post_views: { type: Number },
    },
    {
        collection: 'Post',
        timestamps: { createdAt: 'post_createdAt', updatedAt: 'post_updatedAt' },
    }
);

const exportSchema = mongoose.model('Post', PostSchema);

export default exportSchema;
