import { Publisher, OrderCreatedEvent, Subjects, OrderCancelledEvent } from "@gauravticketing/common";
 
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.orderCancelled = Subjects.orderCancelled
}