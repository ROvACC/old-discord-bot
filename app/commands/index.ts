import { Command } from '../types'
import { Ping } from './general/ping'
import { Metar } from './met/metar'
import { FutureBookings } from './vatsim/future-bookings'
import { OnlineAtc } from './vatsim/online-atc'
import { OnlineFlights } from './vatsim/online-flights'

export const Commands: Command[] = [
  Ping,
  Metar,
  OnlineAtc,
  OnlineFlights,
  FutureBookings,
]
