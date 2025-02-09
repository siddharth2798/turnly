/**
 * Copyright (c) 2022, Turnly (https://turnly.app)
 * All rights reserved.
 *
 * Licensed under BSD 3-Clause License. See LICENSE for terms.
 */
import { commandBus, eventBus, queryBus } from '@turnly/shared'

import { LocationsFactory } from '../factories/LocationsFactory'

/**
 * Location module
 */
queryBus.register(LocationsFactory.getQueryHandlers())
commandBus.register(LocationsFactory.getCommandHandlers())
eventBus.subscribe(LocationsFactory.getEventSubscribers())
