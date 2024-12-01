import express from "express";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    res.send(messages);
});

messagesRouter.post('/', (req, res) => {
    res.send('Will create new message here');
    console.log(req.body);
});

export default messagesRouter;
