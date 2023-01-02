import Comment from '../models/comment';
import Post from '../models/post'

exports.CreateComment = async (req, res) => {
    const body = req.body;
    const { content, author, postId } = body;

    try {
        const comment = new Comment({
            id: id,
            content: content,
            author: author,
            likes: [],
            dislikes: [] 
        });
        await comment.save();

        const post = await Post.findOneAndUpdate(
            {id: postId},
            {
                $push: {
                    comment: id
                }
            }
        )
        res.status(200).send({ message: 'success', contents: comment });
    } catch (err) {
        console.log(err);
    }
};

exports.UpdateCommentRating = async (req, res) => {
    const body = req.body;
    const { id, option, userId } = body;

    try {
        if (option > 0) {
            const comment = await Comment.findOneAndUpdate(
                { id: id },
                {   
                    $push: {
                        dislikes: userId
                    },
                    $pull: {
                        likes: userId
                    }
                }
            );
            res.status(200).send({ message: 'success', contents: comment });
        }
        else if (option < 0) {
            array = (post.dislikes.indexOf(id) === -1) ? post.dislikes : post.dislikes.slice(post.dislikes.indexOf(id));
            const comment = await Comment.findOneAndUpdate(
                { id: id },
                {   
                    $push: {
                        likes: userId
                    },
                    $pull: {
                        dislikes: userId
                    }
                }
            );
            res.status(200).send({ message: 'success', contents: comment });
        }
        else {
            const comment = await Comment.findOneAndUpdate(
                { id: id },
                {   
                    $pull: {
                        likes: userId,
                        dislikes: userId
                    }
                }
            );
            res.status(200).send({ message: 'success', contents: comment });
        }
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
