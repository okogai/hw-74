import {promises as fs} from 'fs';
import {Message} from "./types";

const data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const filesDb = await fs.readdir('./messagesDb');
            filesDb.sort((a, b) => a.localeCompare(b));
            const lastFiveMessages = filesDb.slice(-5);

            await Promise.all(
                lastFiveMessages.map(async (file) => {
                    const fileContents = await fs.readFile(`./messagesDb/${file}`);
                    const result = JSON.parse(fileContents.toString()) as Message;
                    data.push(result);
                })
            );
        } catch (e) {
            console.error('Error initializing database:', e);
        }
    },
    async getItems() {
        return data;
    },
};

export default fileDb;

