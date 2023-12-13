import {Publisher , Subjects, TicketUpdatedEvent} from "@gauravticketing/common"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
 subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}