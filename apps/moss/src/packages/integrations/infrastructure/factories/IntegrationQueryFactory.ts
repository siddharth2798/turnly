import { TEntityManager } from '@turnly/core'
import { IntegrationByIdQuery } from 'packages/integrations/application/queries/IntegrationByIdQuery'
import { IIntegrationQueryFactory } from 'packages/integrations/domain/contracts/IIntegrationQueryFactory'

import { IIntegrationMapper } from '../contracts/IIntegrationMapper'

export class IntegrationQueryFactory implements IIntegrationQueryFactory {
  public constructor(
    private readonly mapper: IIntegrationMapper,
    private readonly manager?: TEntityManager
  ) {}

  public getById() {
    return new IntegrationByIdQuery(this.mapper, this.manager)
  }
}
