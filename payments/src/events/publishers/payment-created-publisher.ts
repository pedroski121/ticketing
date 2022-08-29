import { Subjects, Publisher, PaymentCreatedEvent } from "@obitickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated
}