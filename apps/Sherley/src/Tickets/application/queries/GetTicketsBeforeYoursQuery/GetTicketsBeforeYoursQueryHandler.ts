import {
  InvalidStateException,
  ResourceNotFoundException,
} from '@turnly/common'
import {
  DateTime,
  IQueryHandler,
  QueryBuilder,
  QueryHandler,
} from '@turnly/shared'
import { ITicketReadableRepo } from 'Tickets/domain/contracts/ITicketsRepo'
import { Ticket } from 'Tickets/domain/entities/Ticket'

import { GetTicketsBeforeYoursQuery } from './GetTicketsBeforeYoursQuery'

@QueryHandler(GetTicketsBeforeYoursQuery)
export class GetTicketsBeforeYoursQueryHandler
  implements IQueryHandler<GetTicketsBeforeYoursQuery, Ticket[]>
{
  public constructor(
    private readonly ticketsReadableRepo: ITicketReadableRepo
  ) {}

  public async execute({ payload }: GetTicketsBeforeYoursQuery) {
    const { ticketId, customerId, companyId } = payload

    const ticket = await this.ticketsReadableRepo.getOne(
      new QueryBuilder<Ticket>()
        .equal('id', ticketId)
        .equal('customerId', customerId)
        .equal('companyId', companyId)
        .in('status', Ticket.getToAttendStatus())
        .getOne()
    )

    if (!ticket) throw new ResourceNotFoundException()

    const { createdAt, serviceId } = ticket.toObject()

    if (!createdAt)
      throw new InvalidStateException('Oops!, ticket has invalid state')

    const today = DateTime.utc().startOfDay().toJSDate()

    return await this.ticketsReadableRepo.find(
      new QueryBuilder<Ticket>()
        .equal('companyId', companyId)
        .equal('serviceId', serviceId)
        .in('status', Ticket.getToAttendStatus())
        .gte('createdAt', today)
        .lte('createdAt', createdAt)
        .getMany()
    )
  }
}
