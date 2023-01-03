import mongoose from 'mongoose';
import Comment from '../models/comment';
import Post from '../models/post';
import User from '../models/user';

import { validateToken } from '../tools';

exports.CreateComment = async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { valid, userId, message } = validateToken(token);

    const body = req.body;
    const { content, postId } = body;

    if (!valid) {
        res.status(403).send({
            message: 'error',
            error: 'ERR_AUTH_NOSIGN',
            detail: message,
        });
        return;
    }

    try {
        const postRet = (await Post.exists({ _id: mongoose.Types.ObjectId(postId) }));
        if (postRet) {
            const comment = new Comment({
                content: content,
                author: mongoose.Types.ObjectId(userId),
                likes: [],
                dislikes: [] 
            });
            try {
                await comment.save(async(_, ct) => {
                    const post = Post.findOneAndUpdate(
                        {_id: mongoose.Types.ObjectId(postId)},
                        {
                            $push: {
                                post_comment: ct._id
                            }
                        },
                        {},
                        () => {}
                    )
                    const { _id: user_id, name: user_name } = await User.findOne({ _id: ct.author });
                    let comment = JSON.parse(JSON.stringify(ct));
                    comment.author = { user_id, user_name };
                    comment.comment_id = comment._id;
                    delete comment._id;
                    res.status(200).send({ message: 'success', contents: comment });
                });
            }
            catch(err) {
                console.log(err);
                res.status(500).send({
                    message: 'error',
                    error: 'ERR_SERVER_DB',
                    detail: err,
                });
            }
            
        } else {
            res.status(403).send({
                message: 'error',
                error: 'ERR_POST_UNKNOWN',
                detail: '',
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: 'error',
            error: 'ERR_SERVER_DB',
            detail: err,
        });
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
