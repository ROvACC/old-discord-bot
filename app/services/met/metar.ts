import axios from 'axios'

export const getMetar = async (icao: string) => {
  try {
    const response = await axios.get(
      `http://metar.vatsim.net/metar.php?id=${icao}`
    )
    return response.data
  } catch (error) {
    return undefined
  }
}
