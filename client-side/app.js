const io = require('socket.io-client')('http://localhost:5005');
const express = require('express');
const app = express();
app.use(express.json());

io.on('From-admin', (msg) => {
  console.log(`From-admin: ${msg}`);
});
// Simulate sending a message from the client
app.post('/', (req, res) => {
  const { message } = req.body;
  io.emit('From-user', message);
  console.log('from-client:', message);
  res.send('Message send');
});

app.listen(3000, () => {
  console.log('app is listeing on port ... 3000');
});
