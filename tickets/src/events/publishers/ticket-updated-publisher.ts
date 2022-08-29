import { Publisher, Subjects, TicketUpdatedEvent } from "@obitickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated ;
}