/**
 * Copyright (c) 2022, Turnly (https://turnly.app)
 * All rights reserved.
 *
 * Licensed under BSD 3-Clause License. See LICENSE for terms.
 */
import { EntityAttributes } from '@turnly/shared'
import { IFieldsMapper } from 'Fields/domain/contracts/IFieldsMapper'
import { Field } from 'Fields/domain/entities/Field'

import { FieldModel, IFieldDocument } from '../models/FieldModel'

export class FieldsMapper implements IFieldsMapper<IFieldDocument> {
  public toEntity(document: IFieldDocument): Field {
    const { _id, ...attrs } = document.toObject<EntityAttributes<Field>>()

    return Field.build({ ...attrs, id: String(_id) })
  }

  public toModel(entity: Field): IFieldDocument {
    const { id: _id, ...attrs } = entity.toObject()

    return new FieldModel({ ...attrs, _id })
  }

  public toEntityList(documents: IFieldDocument[]): Field[] {
    return documents?.map(document => this.toEntity(document))
  }

  public toModelList(entities: Field[]): IFieldDocument[] {
    return entities?.map(entity => this.toModel(entity))
  }
}
