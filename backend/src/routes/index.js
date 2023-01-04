import commentRoute from './comment';
import postRoute from './post';
import userRoute from './user';
import tagRoute from './tag';
import { Router } from 'express';

const router = Router();

router.use('/api/v1', commentRoute);
router.use('/api/v1', postRoute);
router.use('/api/v1', userRoute);
router.use('/api/v1', tagRoute);


export default router;