import commentRoute from './comment';
import postRoute from './post';
import userRoute from './user';
import tagRoute from './tag';

const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2]);

function main(app) {
    /* User Route */
    app.post('/api/v1/signInUser', wrap(userRoute.SignInUser));
    app.get('/api/v1/getUser', wrap(userRoute.GetUserInfo));
    // app.post('/api/v1/updateUser', wrap(userRoute.updateUser));

    /* Tag Route */
    app.get('/api/v1/getMainTagList', wrap(tagRoute.GetMainTagList));

    /* Post Route */
    app.get('/api/v1/getPostList', wrap(postRoute.GetPostList));
    app.get('/api/v1/getSinglePost', wrap(postRoute.GetSinglePost));
    app.post('/api/v1/createPost', wrap(postRoute.CreatePost));
    app.post('/api/v1/updatePostRating', wrap(postRoute.UpdatePostRating));
    app.post('/api/v1/deletePost', wrap(postRoute.DeletePost));
    // app.get('/api/v1/updatePost', wrap(postRoute.UpdatePost));

    /* Comment Route */
    app.post('/api/v1/createComment', wrap(commentRoute.CreateComment));
    app.post('/api/v1/adoptComment', wrap(commentRoute.AdoptComment));
    app.post('/api/v1/updateCommentRating', wrap(commentRoute.UpdateCommentRating));
    // app.get('/api/v1/updateComment', wrap(commentRoute.UpdateComment));
    // app.get('/api/v1/deleteComment', wrap(commentRoute.DeleteComment));
    
}

export default main;
