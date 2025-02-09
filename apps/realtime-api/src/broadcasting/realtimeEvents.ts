/**
 * Copyright (c) 2022, Turnly (https://turnly.app)
 * All rights reserved.
 *
 * Licensed under BSD 3-Clause License. See LICENSE for terms.
 */
export enum RealtimeEvents {
  /**
   * Service events
   */
  SERVICE_TICKETS_AHEAD = 'service.tickets.ahead',
  SERVICE_TICKETS_BEHIND = 'service.tickets.behind',

  /**
   * Ticket events
   */
  TICKET_BEFORE_YOURS_UPDATED = 'ticket.before-yours.updated',

  /**
   * Global events
   */
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
}
