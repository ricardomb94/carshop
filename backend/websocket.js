export default (io) => {
    io.on('connection', (socket) => {
      console.log('Client connected');
  
      socket.on('submit_contact_form', (formData) => {
        // Access database or perform operations here (simulated delay)
        setTimeout(() => {
          io.emit('new_message', formData); // Broadcast message to all clients
        }, 2000);
      });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  };