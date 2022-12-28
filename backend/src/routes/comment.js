import Comment from '../models/comment';

exports.CreateComment = async (req, res) => {
    const body = req.body;
    const { id, content, author, postId } = body;

    try {
        const comment = new Comment({
            id: id,
            content: content,
            author: author,
            postId: postId,
        });
        await comment.save();
        res.status(200).send({ message: 'success', contents: comment });
    } catch (err) {
        console.log(err);
    }
};

exports.UpdateComment = async (req, res) => {
    const body = req.body;
    const { id, content, postId } = body;

    try {
        const comment = await Comment.findOneAndUpdate(
            { id: id },
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

exports.DeleteComment = async (req, res) => {
    const body = req.body;
    const { id, postId } = body;

    try {
        const comment = await Comment.deleteOne({ id: id });
    } catch (err) {
        console.log(err);
    }
};
