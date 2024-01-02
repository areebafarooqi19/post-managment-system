const { Server } = require('socket.io');

const io = new Server('5005');

const connectChat = () => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('From-user', (msg) => {
      console.log(`From-user: ${msg}`);
    });
  });
};
const chatSupport = (req, res) => {
  const { message } = req.body;
  io.emit('From-admin', message);
  console.log('From-admin', message);
  res.send('Message sent!');
};

module.exports = { chatSupport, connectChat };
