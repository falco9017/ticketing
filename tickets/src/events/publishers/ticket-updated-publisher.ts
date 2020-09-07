import { Publisher, Subjects, TicketUpdatedEvent } from '@fflibs/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
