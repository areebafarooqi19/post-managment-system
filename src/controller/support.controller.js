// const { Server } = require('socket.io');

// const io = new Server('5005');

// const connectChat = () => {
//   return io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });
// };

const chatSupport = () => {
  console.log(io);
  // const { message } = req.body;
  //io.emit('greeting-from-server', { server: message });
  // res.send('Message sent!', { server: message });
};

module.exports = {
  // connectChat,
  chatSupport,
};
