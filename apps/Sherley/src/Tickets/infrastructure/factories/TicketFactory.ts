import {
  ICommandHandler,
  IEventSubscriber,
  IQueryHandler,
} from '@turnly/shared'
import { Box } from '@turnly/shared'
import { AnnounceTicketCommandHandler } from 'Tickets/application/commands/AnnounceTicketCommand'
import { CreateTicketCommandHandler } from 'Tickets/application/commands/CreateTicketCommand'
import { CreateTicketReadingDBCommandHandler } from 'Tickets/application/commands/CreateTicketReadingDBCommand'
import { LeaveTicketCommandHandler } from 'Tickets/application/commands/LeaveTicketCommand'
import { GetActiveTicketsByCustomerQueryHandler } from 'Tickets/application/queries/GetActiveTicketsByCustomerQuery'
import { GetTicketsBeforeYoursQueryHandler } from 'Tickets/application/queries/GetTicketsBeforeYoursQuery'
import { GetTicketsWaitingForServiceQueryHandler } from 'Tickets/application/queries/GetTicketsWaitingForServiceQuery'
import { TicketByIdQueryHandler } from 'Tickets/application/queries/TicketByIdQuery'
import { CreateTicketReadingDBSubscriber } from 'Tickets/application/subscribers/CreateTicketReadingDBSubscriber'

import { TicketsController } from '../api/controllers/TicketsController'

export class TicketFactory {
  public static getController(): TicketsController {
    return Box.resolve<TicketsController>('ticketsController')
  }

  public static getQueryHandlers(): IQueryHandler[] {
    return [
      Box.resolve<TicketByIdQueryHandler>('ticketByIdQueryHandler'),
      Box.resolve<GetActiveTicketsByCustomerQueryHandler>(
        'getActiveTicketsByCustomerQueryHandler'
      ),
      Box.resolve<GetTicketsBeforeYoursQueryHandler>(
        'getTicketsBeforeYoursQueryHandler'
      ),
      Box.resolve<GetTicketsWaitingForServiceQueryHandler>(
        'getTicketsWaitingForServiceQueryHandler'
      ),
    ]
  }

  public static getCommandHandlers(): ICommandHandler[] {
    return [
      Box.resolve<CreateTicketCommandHandler>('createTicketCommandHandler'),
      Box.resolve<CreateTicketReadingDBCommandHandler>(
        'createTicketReadingDBCommandHandler'
      ),
      Box.resolve<LeaveTicketCommandHandler>('leaveTicketCommandHandler'),
      Box.resolve<AnnounceTicketCommandHandler>('announceTicketCommandHandler'),
    ]
  }

  public static getEventSubscribers(): IEventSubscriber[] {
    return [
      Box.resolve<CreateTicketReadingDBSubscriber>(
        'createTicketReadingDatabaseSubscriber'
      ),
    ]
  }
}
