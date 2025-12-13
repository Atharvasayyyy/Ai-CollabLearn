import app from './app.js';
import http from 'http';
const server = http.createServer(app);
const dotenv = await import('dotenv');
dotenv.config();




const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});