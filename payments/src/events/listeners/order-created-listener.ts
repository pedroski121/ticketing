import { Listener, OrderCreatedEvent, Subjects } from "@obitickets/common";
import { Message } from "node-nats-streaming";
import { queuegroupName } from "./queue-group-name";
import { Order } from "../../models/order";


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queuegroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg:Message) {
        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: data.status,
            userId: data.userId,
            version:data.version
        });

        await order.save()
        msg.ack()
    }
}

