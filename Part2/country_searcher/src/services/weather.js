import axios from "axios";

const baseWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const baseIconUrl = 'https://openweathermap.org/img/wn/'

const getByLatLon = ([lat, lng]) => {
  return axios
    .get(`${baseWeatherUrl}lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`)
    .then(response => response.data)
}

const getIconUrl = (iconCode) => {
  return `${baseIconUrl}${iconCode}@2x.png`
}

const kelvinToCelcius = (tK) => {
  return Math.round(tK - 273.15, 1)
}

export default {
  getByLatLng: getByLatLon,
  getIconUrl: getIconUrl,
  kelvinToCelcius: kelvinToCelcius
}