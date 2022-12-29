import Post from '../models/post';

exports.CreatePost = async (req, res) => {
    const body = req.body;
    const { id, author, tag, topic, content } = body;
    try {
        const post = new Post({
            id: id,
            author: author,
            tag: tag,
            topic: topic,
            content: content,
        });
        await post.save();
        res.status(200).send({ message: 'success', contents: post });
    } catch (err) {
        console.log(err);
    }
};

exports.GetPost = async (req, res) => {
    const id = req.query.id;
    Post.find({ id: id }).exec((err, data) => {
        if (err) {
            res.status(403).send({ message: 'error', contents: [] });
        } else {
            res.status(200).send({ message: 'success', contents: data });
        }
    });
};

exports.UpdatePost = async (req, res) => {
	const body = req.body
    const { content, postId } = body;
        try {
            const post = await Post.findOneAndUpdate(
                { id: postId },
                {
                    $set: {
                        content: content,
                    },
                }
            );
        } catch (err) {
            console.log(err);
        }
};
