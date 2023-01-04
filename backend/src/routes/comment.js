import mongoose from 'mongoose';
import Comment from '../models/comment';
import Post from '../models/post';
import User from '../models/user';

import { validateToken } from '../tools';
import { Router } from "express";

const router = Router();

router.post("/createComment", async (req, res) => {
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
                    const { _id: user_id, name: user_name, avatar: user_avatar } = await User.findOne({ _id: ct.author });
                    let comment = JSON.parse(JSON.stringify(ct));
                    comment.author = { user_id, user_name, user_avatar };
                    comment.comment_id = comment._id;
                    delete comment._id;
                    comment.comment_rate = 0;
                    comment.comment_userLiked = false;
                    comment.comment_userDisliked = false;
                    delete comment.likes;
                    delete comment.dislikes;
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
});

router.post("/updateCommentRating", async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { valid, userId, message } = validateToken(token);

    const body = req.body;
    const { commentId, option } = body;
    
    if (!valid) {
        res.status(403).send({
            message: 'error',
            error: 'ERR_AUTH_NOSIGN',
            detail: message,
        });
        return;
    }

    if (!commentId) {
        res.status(422).send({
            message: 'error',
            error: 'ERR_NOINPUT',
            detail: 'POSTID',
        });
        return;
    }

    if (isNaN(parseInt(option)) || ![-1, 0, 1].includes(parseInt(option))) {
        res.status(422).send({
            message: 'error',
            error: 'ERR_NOINPUT',
            detail: 'OPTION',
        });
        return;
    }

    const optionNew = parseInt(option) + 1;
        
    const updateOption = [{
        $addToSet: { dislikes: mongoose.Types.ObjectId(userId) },
        $pull: { likes: mongoose.Types.ObjectId(userId) },
    }, {
        $pull: {
            likes: mongoose.Types.ObjectId(userId),
            dislikes: mongoose.Types.ObjectId(userId),
        },
    }, {
        $addToSet: { likes: mongoose.Types.ObjectId(userId) },
        $pull: { dislikes: mongoose.Types.ObjectId(userId) },
    }];

    Comment.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(commentId) }, updateOption[optionNew], { new: true },
        (err, doc) => {
            if (err) {
                res.status(500).send({
                    message: 'error',
                    error: 'ERR_SERVER_DB',
                    detail: err,
                });
            } else {
                res.status(200).send({
                    message: 'success',
                    contents: {
                        comment_userLiked: (valid) && (JSON.parse(JSON.stringify(doc.likes)).indexOf(userId) >= 0),
                        comment_userDisliked: (valid) && (JSON.parse(JSON.stringify(doc.dislikes)).indexOf(userId) >= 0),
                        comment_rate: doc.likes.length - doc.dislikes.length,
                    },
                });
            }
        }
    );
});

export default router;