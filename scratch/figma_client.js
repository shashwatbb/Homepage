import WebSocket from 'ws';

const socket = new WebSocket('ws://localhost:3055');

socket.on('open', () => {
  console.log('Connected to socket server');
  // Joining the channel
  socket.send(JSON.stringify({ type: 'join', channel: '5r1ro7x7' }));
  
  // Wait a bit then send the command
  setTimeout(() => {
    console.log('Sending make header command...');
    socket.send(JSON.stringify({ 
      type: 'message', 
      channel: '5r1ro7x7',
      text: `Please create a set of color variables in Figma based on our design system. 
      Neutral Palette:
      - Neutral-0: #ffffff
      - Neutral-50: #fafafa
      - Neutral-100: #f5f5f5
      - Neutral-200: #e5e5e5
      - Neutral-300: #d4d4d4
      - Neutral-400: #a3a3a3
      - Neutral-500: #737373
      - Neutral-600: #525252
      - Neutral-700: #404040
      - Neutral-800: #262626
      - Neutral-900: #171717
      
      Premium Tones:
      - Warm-BG: #fdfaf6
      - Border: rgba(0, 0, 0, 0.06)
      
      Primary Accent:
      - Accent: #4003da`
    }));
  }, 1000);
});

socket.on('message', (data) => {
  console.log('Received:', data.toString());
});

socket.on('error', (err) => {
  console.error('Error:', err);
});
