import {Publisher , Subjects, TicketCreatedEvent} from "@gauravticketing/common"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
 subject: Subjects.TicketCreated = Subjects.TicketCreated
}