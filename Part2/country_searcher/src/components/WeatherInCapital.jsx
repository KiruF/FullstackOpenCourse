import { useEffect } from 'react'
import { useState } from 'react'
import weatherService from '../services/weather'

const WeatherInCapital = ({capitalName,  latlng }) => {

    const [weather, setWeather] = useState(null)

    const weatherHook = () => {
        weatherService
            .getByLatLng(latlng)
            .then(response => setWeather(response))
            .catch(err => console.log(`weatherHook error ${err}`))
    }
    useEffect(weatherHook, [latlng])

    if (!weather)
        return null

    return (
        <div>

            <h1>Weather in {capitalName}</h1>

            <div>
                Temperature {weatherService.kelvinToCelcius(weather.main.temp)} Celcius
            </div>

            <img src={weatherService.getIconUrl(weather.weather[0].icon)} />

            <div>
                Wind {weather.wind.speed} m/s
            </div>

        </div>
    )
}

export default WeatherInCapital