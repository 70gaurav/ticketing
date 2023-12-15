import { Publisher, OrderCreatedEvent, Subjects } from "@gauravticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}

