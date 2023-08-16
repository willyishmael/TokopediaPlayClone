import http from 'http';
import app from './app.js';

const PORT = 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log("Server running on PORT: " + PORT);
})

server.on('error', (error) => {
    console.error('Server error:', error)
})