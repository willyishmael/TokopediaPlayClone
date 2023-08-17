import bodyParser from "body-parser";
import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/videos', (req, res) => {
    res.send('show all video');
})

router.get('/videos/:id', (req, res) => {
    res.send('show video with id: ' + req.params.id);
})

export default router;