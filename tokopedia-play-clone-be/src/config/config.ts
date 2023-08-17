import dotenv from "dotenv-esm";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';
const SERVER_PORT = process.env.SERVER_PORT || 3001;

export const config = {
    mongodb: {
        uri: MONGODB_URI
    },
    server: {
        port: SERVER_PORT
    }
}