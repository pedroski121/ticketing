import { Publisher, OrderCreatedEvent, Subjects } from "@obitickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject= Subjects.OrderCreated;
}