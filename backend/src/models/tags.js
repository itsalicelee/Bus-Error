import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = Schema(
    {
        /* Required */
        tag_isMainTag: { type: Boolean },
        tag_identifier: { type: String },
        tag_displayName: { type: String },
        /* Not Required */
    },
    {
        collection: 'Tag',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

const exportSchema = mongoose.model('Tag', TagSchema);

export default exportSchema;
