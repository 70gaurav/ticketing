import nats from 'node-nats-streaming'
import { TicketCreatedPblisher } from './events/ticket-created-publisher'
console.clear()
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
})

stan.on('connect' , () => {
    console.log('publisher connected to NATS')

    const data = JSON.stringify({
        id:'123',   
        title: 'semi-final',
        price: 20
    })

    stan.publish('ticket:created', data, () => {
        console.log('Event published')
    })

    const publisher = new TicketCreatedPblisher(stan)
    publisher.publish({
        id: '123',
        title: 'concert',
        price: 30
    })
})



// import nats from 'node-nats-streaming';

// const stan = nats.connect('ticketing', 'abc', {
//   url: 'http://localhost:4222',
// });

// stan.on('connect', () => {
//   console.log('Publisher connected to NATS');

//   const data = JSON.stringify({
//     id: '123',
//     title: 'concert',
//     price: 20,
//   });

//   stan.publish('ticket:created', data, () => {
//     console.log('Event published');
//   });
// });
