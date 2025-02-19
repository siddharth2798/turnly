/**
 * Copyright (c) 2022, Turnly (https://turnly.app)
 * All rights reserved.
 *
 * Licensed under BSD 3-Clause License. See LICENSE for terms.
 */
import { BadRequestException } from '@turnly/common'
import { Producers } from '@turnly/rpc'
import { Client } from '@turnly/rpc/dist/consumers'

import { CustomersController } from '../controllers/CustomersController'
import { CustomerMapper } from './CustomersMapper'

export class CustomersServer extends Producers.ServerImplementation<Producers.QueuingSystem.ICustomersServer> {
  public constructor(
    private readonly customersController: CustomersController
  ) {
    super()
  }

  @Producers.CallHandler(Producers.QueuingSystem.CreateCustomerResponse)
  public async create(
    call: Producers.ServerUnaryCall<
      Producers.QueuingSystem.CreateCustomerRequest,
      Producers.QueuingSystem.CreateCustomerResponse
    >,
    callback: Producers.ICallback<Producers.QueuingSystem.CreateCustomerResponse>
  ) {
    const payload = call.request.getCustomer()

    if (!payload) throw new BadRequestException('Missing customer payload.')

    const { data, meta } = await this.customersController.create({
      name: payload.getName(),
      lastname: payload.getLastname(),
      email: payload.getEmail(),
      phone: payload.getPhone(),
      country: payload.getCountry(),
      hasWhatsapp: payload.getHasWhatsapp(),
      showNameSignage: payload.getShowNameSignage(),
      organizationId: Client.getOrganizationId(call),
      extra: payload.getExtrasList().map(e => e.toObject()),
    })

    const response = new Producers.QueuingSystem.CreateCustomerResponse()
    const customer = CustomerMapper.toRPC(data)

    response.setData(customer)
    response.setMeta(Producers.MetaMapper.toRPC(meta))

    callback(null, response)
  }

  @Producers.CallHandler(Producers.QueuingSystem.GetCustomerResponse)
  public async getOne(
    call: Producers.ServerUnaryCall<
      Producers.QueuingSystem.GetCustomerRequest,
      Producers.QueuingSystem.GetCustomerResponse
    >,
    callback: Producers.ICallback<Producers.QueuingSystem.GetCustomerResponse>
  ) {
    const { data, meta } = await this.customersController.getOne({
      id: call.request.getId(),
      organizationId: Client.getOrganizationId(call),
    })

    const response = new Producers.QueuingSystem.GetCustomerResponse()
    const customer = CustomerMapper.toRPC(data)

    response.setData(customer)
    response.setMeta(Producers.MetaMapper.toRPC(meta))

    callback(null, response)
  }

  public get implementation() {
    return {
      create: this.create.bind(this),
      getOne: this.getOne.bind(this),
    }
  }
}
