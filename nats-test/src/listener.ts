import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';
console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');
  //to avoid timeout for response before closing that can cause message lost
  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});

//catch interrupt from console and try to close the server
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
