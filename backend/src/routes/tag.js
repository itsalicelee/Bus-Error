import Tag from '../models/tag';
import { Router } from "express";

const router = Router();

router.get("/getMainTagList", async (req, res) => {
    Tag.find({}, {
        '_id': 0,
        'tag_identifier': 1,
        'tag_displayName': 1,
    }).exec((err, data) => {
        if (err) {
            res.status(500).send({
                message: 'error',
                contents: []
            });
        } else {
            res.status(200).send({
                message: 'success',
                contents: {
                    tags: data,
                },
            });
        }
    });
});

export default router;
