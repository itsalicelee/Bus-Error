import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { validateToken } from '../tools';
import User from '../models/user';
import Post from '../models/post';
import Comment from '../models/comment';

import { Router } from "express";
const router = Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        return { payload: ticket.getPayload() };
    } catch (error) {
        return { error: "Invalid user detected. Please try again" };
    }
};

const generateUsername = (firstName, lastName) => lastName + ' ' + firstName;

router.post("/signInUser", async (req, res) => {
    try {
        if (req.body.credential) {

            const verificationResponse = await verifyGoogleToken(req.body.credential);

            if (verificationResponse.error) {
                return res.status(400).json({ message: verificationResponse.error });
            }

            const profile = verificationResponse?.payload;

            const userInfo = await User.findOne({ email: profile?.email });

            if (userInfo) {
                const postCount = await Post.find({ post_author: userInfo._id }).count();
                const commentCountAll = await Comment.find({ author: userInfo._id }).count();
                const commentCountAdopted = await Comment.find({ author: userInfo._id, adopted: true }).count();
                res.status(200).json({
                    message: 'success_signin',
                    user: {
                        name: userInfo.name,
                        email: userInfo.email,
                        avatar: userInfo.avatar ?? 'https://lh3.googleusercontent.com/a/AEdFTp6ort-2DsEdlK0teHw1C4UQV_j0l-VmQ5DyxOfT=s96-c',
                        token: jwt.sign({ id: userInfo._id }, process.env.JWT_SECRET, { expiresIn: '1d' }),
                        join: userInfo.createdAt,
                        counts: {
                            post: postCount,
                            commentAll: commentCountAll,
                            commentAdopted: commentCountAdopted,
                        }
                    },
                });
            } else {
                const newUser = new User({
                    name: generateUsername(profile?.given_name, profile?.family_name),
                    email: profile?.email,
                    avatar: profile?.picture ?? 'https://lh3.googleusercontent.com/a/AEdFTp6ort-2DsEdlK0teHw1C4UQV_j0l-VmQ5DyxOfT=s96-c',
                });
                await newUser.save(async (_, user) => {
                    res.status(200).json({
                        message: 'success_signup',
                        user: {
                            name: user.name,
                            email: user.email,
                            avatar: user.avatar,
                            token: jwt.sign({ id: user._id  }, process.env.JWT_SECRET, { expiresIn: '1d' }),
                            join: user.createdAt,
                            counts: {
                                post: 0,
                                commentAll: 0,
                                commentAdopted: 0,
                            }
                        },
                    });
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error?.message || error,
        });
    }
});

router.get("/getUser", async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { valid, userId, message } = validateToken(token);

    const body = req.body;
    const { postId, option } = body;
    
    if (!valid) {
        res.status(200).json({
            message: 'success',
            user: {},
        });
        return;
    }

    User.findOne({
        _id: mongoose.Types.ObjectId(userId),
    }).exec(async (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'error',
                error: 'ERR_SERVER_DB',
                detail: err,
            });
        } else {
            console.log(data)
            if (!data) {
                res.status(200).json({
                    message: 'success',
                    user: {},
                });
                return;
            }
            const postCount = await Post.find({ post_author: mongoose.Types.ObjectId(userId) }).count();
            const commentCountAll = await Comment.find({ author: mongoose.Types.ObjectId(userId) }).count();
            const commentCountAdopted = await Comment.find({ author: mongoose.Types.ObjectId(userId), adopted: true }).count();
            res.status(200).json({
                message: 'success',
                user: {
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar ?? 'https://lh3.googleusercontent.com/a/AEdFTp6ort-2DsEdlK0teHw1C4UQV_j0l-VmQ5DyxOfT=s96-c',
                    join: data.createdAt,
                    counts: {
                        post: postCount,
                        commentAll: commentCountAll,
                        commentAdopted: commentCountAdopted,
                    }
                },
            });
        }
    })
});

router.post("/updateUser", async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { valid, userId, message } = validateToken(token);

    const body = req.body;
    const { newName } = body;
    
    if (!valid) {
        res.status(403).send({
            message: 'error',
            error: 'ERR_AUTH_NOSIGN',
            detail: message,
        });
    }
    if (!newName) {
        res.status(422).send({
            message: 'error',
            error: 'ERR_NOINPUT',
            detail: 'NEW_NAME',
        });
        return;
    }

    User.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(userId),
    }, {
        $set: { name: newName, },
    }, {}, async (err, data) => {
        if (err) {
            res.status(500).send({
                message: 'error',
                error: 'ERR_SERVER_DB',
                detail: err,
            });
        } else {
            const postCount = await Post.find({ post_author: mongoose.Types.ObjectId(userId) }).count();
            const commentCountAll = await Comment.find({ author: mongoose.Types.ObjectId(userId) }).count();
            const commentCountAdopted = await Comment.find({ author: mongoose.Types.ObjectId(userId), adopted: true }).count();
            res.status(200).json({
                message: 'success',
                user: {
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar ?? 'https://lh3.googleusercontent.com/a/AEdFTp6ort-2DsEdlK0teHw1C4UQV_j0l-VmQ5DyxOfT=s96-c',
                    join: data.createdAt,
                    counts: {
                        post: postCount,
                        commentAll: commentCountAll,
                        commentAdopted: commentCountAdopted,
                    }
                },
            });
        }
    });
});

export default router;