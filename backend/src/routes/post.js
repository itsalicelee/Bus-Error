import Post from '../models/post';

exports.CreatePost = async (req, res) => {
    const body = req.body;
    const { id, author, tags, topic, content } = body;
    try {
        const post = new Post({
            post_id: id,
            post_author: author,
            post_tags: tags,
            post_topic: topic,
            post_fbody: content,
            post_sbody: content.slice(0, 100), // get first 100 characters
        });
        await post.save();
        res.status(200).send({ message: 'success', contents: post });
    } catch (err) {
        console.log(err);
    }
};

exports.GetPostList = async (req, res) => {
    const tag = req.query.tag;
    Post.find({ post_tags: tag }).exec((err, data) => {
        const post_per_page = 10; // default:  10 posts in a page
        const totalPage = data.length / post_per_page;

        const rates = data.post_like.length - data.post_dislike.length;
        data.post_rates = rates;

        const returnObject = {
            totalPage: totalPage,
            mainTag: {
                tag_identifier: tag,
                tag_displayName: tag,
            },
            posts: data,
        };

        if (err) {
            res.status(403).send({ message: 'error', contents: [] });
        } else {
            res.status(200).send({
                message: 'success',
                contents: returnObject,
            });
        }
    });
};

exports.GetSinglePost = async (req, res) => {
    const id = req.query.id;
    Post.find({ post_id: id }).exec((err, data) => {
        if (err) {
            res.status(403).send({ message: 'error', contents: [] });
        } else {
            data.post_rates = data.post_like.concat(data.post_dislike); // an array of user who likes and dislikes

            res.status(200).send({
                message: 'success',
                contents: data,
            });
        }
    });
};

exports.UpdatePostRating = async (req, res) => {
    const body = req.body;
    const { id, option, userId } = body;
    try {
        //TODO: 
        res.status(200).send({ message: 'success', contents: comment });
        
    } catch (err) {
        console.log(err);
    }
};

exports.UpdatePost = async (req, res) => {
    const body = req.body;
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
