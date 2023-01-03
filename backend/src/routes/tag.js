import Tag from '../models/tag';

exports.GetMainTagList = async (req, res) => {
    Tag.find({}, {
        '_id': 0,
        'tag_identifier': 1,
        'tag_displayName': 1,
    }).exec((err, data) => {
        if (err) {
            res.status(500).send({
                message: 'error',
                contents: []
            });
        } else {
            res.status(200).send({
                message: 'success',
                contents: {
                    tags: data,
                },
            });
        }
    });
};
