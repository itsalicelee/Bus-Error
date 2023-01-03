import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const PostSchema = Schema(
    {
        /* Required */
        post_author: { type: mongoose.Types.ObjectId, required: true, ref: 'Tag' },
        post_title: { type: String, required: true },
        post_topic: { type: mongoose.Types.ObjectId, ref: 'Tag' },
        post_tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
        post_fbody: { type: String, required: true },
        post_sbody: { type: String, required: true },

        /* Not Required */
        post_like: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        post_dislike: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        post_comment: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
        post_commentHasAdopt: { type: Boolean, default: false },
        post_views: { type: Number, default: 0 },
    },
    {
        collection: 'Post',
        timestamps: { createdAt: 'post_createdAt', updatedAt: 'post_updatedAt' },
    }
);

const exportSchema = mongoose.model('Post', PostSchema);

export default exportSchema;
