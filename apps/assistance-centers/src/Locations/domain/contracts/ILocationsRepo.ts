/**
 * Copyright (c) 2022, Turnly (https://turnly.app)
 * All rights reserved.
 *
 * Licensed under BSD 3-Clause License. See LICENSE for terms.
 */
import { IReadableRepository, IWritableRepository } from '@turnly/shared'

import { Location } from '../entities/Location'

export type ILocationsReadableRepo = IReadableRepository<Location>
export type ILocationsWritableRepo = IWritableRepository<Location>
