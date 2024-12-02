import express from 'express';
import { promises as fs } from 'fs';
import messagesRouter from "./routers/messagesRouter";
import fileDb from "./fileDb";

const app = express();
const port = 8000;
app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
    try {
        await fs.access('./messagesDb');
    } catch (error) {
        await fs.mkdir('./messagesDb');
    }
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);


