/**
 * Copyright (c) Turnly Inc. (https://turnly.app)
 *
 * Licensed under MIT License. See LICENSE for terms.
 */

import { TicketsWaitingForServiceQueryHandler } from '../../../../../../src/Tickets/application/queries/TicketsWaitingForServiceQuery'
import { TicketsReadableRepo } from '../../../__mocks__/TicketsReadableRepo'
import { TicketsWaitingForServiceQueryMother } from './TicketsWaitingForServiceQueryMother'

let repository: TicketsReadableRepo
let handler: TicketsWaitingForServiceQueryHandler

describe('tickets > queries > validates the expected behavior of TicketsBeforeYoursQuery', () => {
  beforeEach(() => {
    repository = new TicketsReadableRepo()
    handler = new TicketsWaitingForServiceQueryHandler(repository)
  })

  it('waiting for service', async () => {
    const query = TicketsWaitingForServiceQueryMother.random()

    await handler.execute(query)

    repository.assertFindHasBeenCalled()
  })
})
