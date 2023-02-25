import axios, { AxiosInstance } from 'axios'
import type {
  VatsimOnlineAtcApiResponse,
  VatsimOnlineFlightsApiResponse,
  FutureBookingApiResponse,
} from '../../types'

let coreClient: AxiosInstance

const getCoreClient = (): AxiosInstance => {
  if (!coreClient) {
    coreClient = axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }
  return coreClient
}

export const getOnlineAtc = async (): Promise<VatsimOnlineAtcApiResponse[] | undefined> => {
  try {
    const client = getCoreClient()
    const url = `${process.env.ROVACC_CORE_ENDPOINT}vatsim/live-atc`
    return (await client.get<Array<VatsimOnlineAtcApiResponse>>(url)).data
  } catch (error) {
    return undefined
  }
}

export const getOnlineFlights = async (): Promise<VatsimOnlineFlightsApiResponse[] | undefined> => {
  try {
    const client = getCoreClient()
    const url = `${process.env.ROVACC_CORE_ENDPOINT}vatsim/live-flights`
    return (await client.get<Array<VatsimOnlineFlightsApiResponse>>(url)).data
  } catch (error) {
    return undefined
  }
}

export const getFutureBookings = async (): Promise<
  FutureBookingApiResponse[] | undefined
> => {
  try {
    const client = getCoreClient()
    const url = `${process.env.ROVACC_CORE_ENDPOINT}vatsim/future-bookings`
    return (await client.get<Array<FutureBookingApiResponse>>(url)).data
  } catch (error) {
    return undefined
  }
}
