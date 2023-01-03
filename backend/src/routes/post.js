import mongoose from 'mongoose';
import Post from '../models/post';
import User from '../models/user';
import Tag from '../models/tag';

import { validateToken } from '../tools';

exports.CreatePost = async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { valid, userId, message } = validateToken(token);

    const body = req.body;
    const { title, tags, topic, content } = body;
    
    if (!valid) {
        res.status(403).send({
            message: 'error',
            error: 'ERR_AUTH_NOSIGN',
            detail: message,
        });
        return;
    }

    try {
        const topicRet = (await Tag.exists({ tag_identifier: topic }));
        if (topicRet) {
            const { _id: topicId } = topicRet;
            const post = new Post({
                post_author: mongoose.Types.ObjectId(userId),
                post_title: title,
                post_tags: tags,
                post_topic: topicId,
                post_fbody: content,
                post_sbody: content.slice(0, 200),
            });
            await post.save();
            res.status(200).send({
                message: 'success',
                contents: post
            });
        } else {
            res.status(422).send({
                message: 'error',
                error: 'ERR_TOPIC_UNKNOWN',
                detail: '',
            });
        }
    } catch (err) {
        res.status(500).send({
            message: 'error',
            error: 'ERR_SERVER_DB',
            detail: err,
        });
    }
};

exports.GetPostList = async (req, res) => {
    const { topic, order, pageNum } = req.query;
    const topicLimit = !(topic === undefined || topic === 'all');
    const orderLimit = !(isNaN(parseInt(order)) || ![0, 1, 2].includes(parseInt(order)));
    const pageNumLimit = !(isNaN(parseInt(pageNum)) || parseInt(pageNum) <= 0);

    // Topic Filter
    let topicFilter = {};
    if (topicLimit) {
        const topicRet = (await Tag.exists({ tag_identifier: topic }));
        if (topicRet) {
            const { _id: topicId } = topicRet;
            topicFilter = { post_topic: mongoose.Types.ObjectId(topicId) };
        } else {
            res.status(422).send({
                message: 'error',
                error: 'ERR_TOPIC_UNKNOWN',
                detail: '',
            });
            return;
        }
    }

    // Unanswered Filter
    const unansweredFilter = (orderLimit && parseInt(order) === 2) ? {'post_comment.0': {$exists: false}} : {};

    // Page Number
    const postPerPage = 10;
    const pageNumOption = (pageNumLimit) ? parseInt(pageNum) - 1 : 0;

    Post
        .aggregate([
            { $project: { post_author: 1, post_title: 1, post_topic: 1, post_tags: 1, post_sbody: 1, post_like: 1, post_dislike: 1, post_comment: 1, post_commentHasAdopt: 1, post_views: 1, post_createdAt: 1 } },
            { $match:   { ...topicFilter, ...unansweredFilter } },
            { $sort:    (orderLimit && parseInt(order) === 1) ? { post_views: -1 } : { post_createdAt: -1 } },
            { $skip:    pageNumOption * 10 },
            { $limit:   postPerPage },
            // { $lookup:  { from: 'tags', localField: 'post_topic', foreignField: '_id', as: 'post_topic' } },
        ])
        .exec(async (err, dt) => {
            let data = JSON.parse(JSON.stringify(dt));
            const totalPostNum = await Post.find({...topicFilter, ...unansweredFilter}).count();

            for (const dataItem of data) {
                const { tag_identifier, tag_displayName } = await Tag.findOne({ _id: mongoose.Types.ObjectId(dataItem.post_topic) });
                dataItem.post_topic = { tag_identifier, tag_displayName };
                
                const { _id: user_id, name: user_name } = await User.findOne({ _id: mongoose.Types.ObjectId(dataItem.post_author) });
                dataItem.post_author = { user_id, user_name };

                dataItem.post_id = dataItem._id;
                delete dataItem._id;

                dataItem.post_rates = dataItem.post_like.length - dataItem.post_dislike.length;
                delete dataItem.post_like;
                delete dataItem.post_dislike;

                dataItem.post_commentCount = dataItem.post_comment.length;
                delete dataItem.post_comment;
            }

            const returnObject = {
                totalPage: Math.ceil(totalPostNum / postPerPage),
                posts: data,
            };

            if (topicLimit) {
                const { tag_identifier, tag_displayName } = await Tag.findOne({ tag_identifier: topic });
                returnObject.mainTag = { tag_identifier, tag_displayName }
            }
            
            if (err) {
                res.status(500).send({
                    message: 'error',
                    error: 'ERR_SERVER_DB',
                    detail: err,
                });
            } else {
                res.status(200).send({
                    message: 'success',
                    contents: returnObject,
                });
            }
    });

};

exports.GetSinglePost = async (req, res) => {
    const { postId } = req.query;

    if (!postId) {
        res.status(422).send({
            message: 'error',
            error: 'ERR_NOINPUT',
            detail: err,
        });
        return;
    }

    const token = req.headers.authorization?.replace('Bearer ', '');
    const { valid, userId } = validateToken(token);

    try {
        Post.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(postId) },
            { $inc: { post_views: 1 } },
            {},
            () => {},
        );
    } catch (err) {
        res.status(500).send({
            message: 'error',
            error: 'ERR_SERVER_DB',
            detail: err,
        });
        return;
    }

    Post
        .aggregate([
            { $project: { post_author: 1, post_title: 1, post_topic: 1, post_tags: 1, post_fbody: 1, post_like: 1, post_dislike: 1, post_comment: 1, post_createdAt: 1 } },
            { $match:   { _id: mongoose.Types.ObjectId(postId) } },
            { $lookup:  { from: 'Comment', localField: 'post_comment', foreignField: '_id', as: 'post_comment' } },
            // { $lookup:  { from: 'tags', localField: 'post_topic', foreignField: '_id', as: 'post_topic' } },
        ])
        .exec(async (err, data) => {
            const dataItem = data[0];

            if (!dataItem) {
                res.status(404).send({
                    message: 'error',
                    error: 'ERR_POST_UNKNOWN',
                    detail: '',
                });
                return;
            }

            const { tag_identifier, tag_displayName } = await Tag.findOne({ _id: mongoose.Types.ObjectId(dataItem.post_topic) });
            dataItem.post_topic = { tag_identifier, tag_displayName };

            const { _id: user_id, name: user_name } = await User.findOne({ _id: mongoose.Types.ObjectId(dataItem.post_author) });
            dataItem.post_author = { user_id, user_name };

            dataItem.post_id = dataItem._id;
            delete dataItem._id;

            dataItem.post_rate = dataItem.post_like.length - dataItem.post_dislike.length;
            dataItem.post_userLiked = (valid) && (JSON.parse(JSON.stringify(dataItem.post_like)).indexOf(userId) >= 0);
            dataItem.post_userDisliked = (valid) && (JSON.parse(JSON.stringify(dataItem.post_dislike)).indexOf(userId) >= 0);
            delete dataItem.post_like;
            delete dataItem.post_dislike;

            
            for (const commentItem of data[0].post_comment) {
                const { _id: user_id, name: user_name } = await User.findOne({ _id: mongoose.Types.ObjectId(commentItem.author) });
                commentItem.author = { user_id, user_name };
                commentItem.comment_id = commentItem._id;
                delete commentItem._id;
            }

            if (err) {
                res.status(500).send({
                    message: 'error',
                    error: 'ERR_SERVER_DB',
                    detail: err,
                });
            } else {
                res.status(200).send({
                    message: 'success',
                    contents: data,
                });
            }
        });
};

exports.UpdatePostRating = async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { valid, userId, message } = validateToken(token);

    const body = req.body;
    const { postId, option } = body;
    
    if (!valid) {
        res.status(403).send({
            message: 'error',
            error: 'ERR_AUTH_NOSIGN',
            detail: message,
        });
        return;
    }

    try {
        res.status(200).send({ message: 'success', contents: comment });
    } catch (err) {
        console.log(err);
    }
};
