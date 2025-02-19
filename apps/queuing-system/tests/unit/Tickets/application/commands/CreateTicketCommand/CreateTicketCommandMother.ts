/**
 * Copyright (c) 2022, Turnly (https://turnly.app)
 * All rights reserved.
 *
 * Licensed under BSD 3-Clause License. See LICENSE for terms.
 */
import { Extra, Guid } from '@turnly/common'
import { ObjectMother } from '@turnly/testing'

import { CreateTicketCommand } from '../../../../../../src/Tickets/application/commands/CreateTicketCommand'

export class CreateTicketCommandMother {
  static create(
    serviceId: Guid = ObjectMother.uuid('srv'),
    serviceName: string = ObjectMother.word(),
    locationId: Guid = ObjectMother.uuid('loc'),
    customerId: Guid = ObjectMother.uuid('cust'),
    organizationId: Guid = ObjectMother.uuid('org'),
    extra: Extra[] = []
  ): CreateTicketCommand {
    return new CreateTicketCommand({
      serviceId,
      serviceName,
      locationId,
      customerId,
      organizationId,
      extra,
    })
  }

  static random(): CreateTicketCommand {
    return this.create()
  }
}
