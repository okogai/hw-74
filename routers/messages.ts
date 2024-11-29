import express from "express";

const messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
    res.send('Messages will be here');
});

messagesRouter.get('/:id', (req, res) => {
    res.send('A single message by id will be here');
});

messagesRouter.post('/', (req, res) => {
    res.send('Will create new message here');
    console.log(req.body);
});

export default messagesRouter;
