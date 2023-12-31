import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";


console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener conncted to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName("accounting-service");

  // const subscription = stan.subscribe(
  //   "ticket:created",
  //   "orders-service-queue-group",
  //   options
  // );

  // subscription.on("message", (msg: Message) => {
  //   // console.log('Message received')
  //   const data = msg.getData();

  //   if (typeof data === "string") {
  //     console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
  //   }

  //   msg.ack();
  // });

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message):void;
  private client: Stan;
  private ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen(){
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    )

    subscription.on('message', (msg: Message) => {
      console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`)
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg)
    })

   
  }

  parseMessage(msg: Message){
    const data = msg.getData()
    return typeof data === 'string'
    ? JSON.parse(data)
    :JSON.parse(data.toString('utf8'))
  }
}

// class TicketCreatedListener extends Listener {
//   subject = 'ticket:created';
//   queueGroupName =  'payments-service';

//   onMessage(data: any, msg: Message){
//     console.log('Event data!', data)

//     msg.ack()
//   }
// }