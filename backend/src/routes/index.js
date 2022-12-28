import commentRoute from './comment';
import postRoute from './post';
import userRoute from './user';

const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2]);

function main(app) {
    /* User Route */
    app.post('/api/v1/createUser', wrap(userRoute.CreateUser));
    app.get('/api/v1/getUser', wrap(userRoute.GetUser));
    /* Post Route */
    app.post('/api/v1/createPost', wrap(postRoute.CreatePost));
    app.get('/api/v1/getPost', wrap(postRoute.GetPost));
    app.patch('/api/v1/updatePost', wrap(postRoute.UpdatePost));
    /* Comment Route */
    app.post('/api/v1/createComment', wrap(commentRoute.CreateComment));
    app.get('/api/v1/updateComment', wrap(commentRoute.UpdateComment));
    app.get('/api/v1/deleteComment', wrap(commentRoute.DeleteComment));
    
}

export default main;
