import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = Schema(
    {
        tag_isMainTag: { type: Boolean },
        tag_identifier: { type: String },
        tag_displayName: { type: String },
    }, {
        collection: 'Tag',
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const exportSchema = mongoose.model('Tag', TagSchema);

export default exportSchema;
