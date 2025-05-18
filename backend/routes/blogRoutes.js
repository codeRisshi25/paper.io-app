import express from 'express';

const router = express.Router();

const saveDraft = router.post('/save-draft', saveController);
const publish = router.post('/publish', saveController);
const getBlogs = router.get('/get-blogs', saveController);
const getBlog = router.get('/get-blog/:id', saveController);
const deleteBlog = router.delete('/delete-blog/:id', saveController);


export default {
    saveDraft,
    publish,
    getBlogs,
    getBlog,
    deleteBlog
};
