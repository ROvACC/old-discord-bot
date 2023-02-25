import axios from 'axios'
import { getMetar } from './metar'

jest.mock('axios')

describe('metar service', () => {
  const axiosGetMetar = axios.get as jest.Mock

  test('should return the metar on a sucessful call', async () => {
    const metar = 'LROP 202000Z 24005KT 4000 NSC Q1031'

    axiosGetMetar.mockResolvedValue({ data: metar })

    const response = await getMetar('LROP')
    expect(response).toEqual(metar)
  })

  test('should return undefined when call fails', async () => {
    axiosGetMetar.mockRejectedValueOnce(new Error(''))

    const response = await getMetar('LROP')
    expect(response).toBeUndefined()
  })
})
