import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

import { validateToken } from '../tools';
import User from '../models/user';

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

exports.SignInUser = async (req, res) => {
    try {
        if (req.body.credential) {

            const verificationResponse = await verifyGoogleToken(req.body.credential);

            if (verificationResponse.error) {
                return res.status(400).json({ message: verificationResponse.error });
            }

            const profile = verificationResponse?.payload;            

            const userExists = await User.exists({ email: profile?.email });

            if (userExists) {
                res.status(200).json({
                    message: 'success_signin',
                    user: {
                        name: generateUsername(profile?.given_name, profile?.family_name),
                        email: profile?.email,
                        token: jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: '1d' }),
                    },
                });
            } else {
                const newUser = new User({
                    name: generateUsername(profile?.given_name, profile?.family_name),
                    email: profile?.email,
                    // avatar: profile?.picture,
                });
                await newUser.save((_, user) => {
                    res.status(200).json({
                        message: 'success_signup',
                        user: {
                            name: generateUsername(profile?.given_name, profile?.family_name),
                            email: profile?.email,
                            token: jwt.sign({ id: user._id  }, process.env.JWT_SECRET, { expiresIn: '1d' }),
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
};

exports.UpdateUser = async (req, res) => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjJmZmEwNmIzMTkwMmNkZDBlNzBlOSIsImlhdCI6MTY3MjY3NTMxNiwiZXhwIjoxNjcyNzYxNzE2fQ._bK7FYti-ysFquF7qjtN891dVIA7o5Q7wXGX5azGqGA';

    // console.log(validateToken(token))
    // res.status(200).send({ message: 'success' });

    // const body = req.body;
    // const { name, email, password, tag } = body;
    // try {
    //     const user = new User({
    //         name: name,
    //         email: email,
    //         password: password,
    //         tag: tag,
    //     });
    //     await user.save();
    //     res.status(200).send({ message: 'success', contents: user });
    // } catch (err) {
    //     console.log(err);
    // }
};
