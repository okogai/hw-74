import {promises as fs} from 'fs';
import {Message} from "./types";

let data: Message[] = [];

const fileDb = {
    init: async function () {
        try {
            const filesDb = await fs.readdir('./messagesDb');
            const responseMessages = filesDb.slice(-5);

            await Promise.all(
                responseMessages.map(async (file) => {
                    const fileContents = await fs.readFile(`./messagesDb/${file}`);
                    const result = JSON.parse(fileContents.toString()) as Message;
                    const datetime = file.replace('.txt', '');
                    data.push({...result, datetime});
                })
            );
        } catch (e) {
            console.error('Error initializing database:', e);
        }
    },
    async getItems() {
        data = [];
        await this.init();
        return data;
    },
    async addItem(message: Message) {
        try {
            const fileContent = { message: message.message };

            const fileName = `./messagesDb/${message.datetime}.txt`;

            await fs.writeFile(fileName, JSON.stringify(fileContent));
        } catch (e) {
            console.error('Error adding new record', e);
        }
    }
};

export default fileDb;

