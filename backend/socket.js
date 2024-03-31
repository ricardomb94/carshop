export default (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected successfully:', socket.id);

    socket.on('error', (error) => {
      console.error('Socket.io error:', error);
    });

    socket.on('submit_contact_form', (formData) => {
      // Access database or perform operations here (simulated delay)
      setTimeout(() => {
        io.emit('new_message', formData); // Broadcast message to all clients
      }, 2000);
    });

    socket.emit("message", {text: "This is a test"})

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
