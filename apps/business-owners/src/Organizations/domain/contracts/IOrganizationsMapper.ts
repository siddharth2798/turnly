/**
 * Copyright (c) 2022, Turnly (https://turnly.app)
 * All rights reserved.
 *
 * Licensed under BSD 3-Clause License. See LICENSE for terms.
 */
import { IEntityMapper } from '@turnly/shared'
import { Organization } from 'Organizations/domain/entities/Organization'

export type IOrganizationsMapper<Model> = IEntityMapper<Organization, Model>
