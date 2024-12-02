import express from "express";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
    const post = {
        message: req.body.message,
        datetime: new Date().toISOString().replace(/:/g, '-'),
    };
    await fileDb.addItem(post);
    res.send(post);
});

export default messagesRouter;
