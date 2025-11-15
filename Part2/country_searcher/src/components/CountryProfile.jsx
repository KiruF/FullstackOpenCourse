import countriesService from '../services/countries'
import { useState, useEffect } from 'react'

const CountryProfile = ({ countryName }) => {

    const [country, setCountry] = useState(null)

    const hook = () => {
        countriesService
            .getByName(countryName)
            .then(response => setCountry(response))
            .catch(err => console.log(`useEffect error ${err}`))
    }
    useEffect(hook, [countryName])

    if (!country)
        return <div>Loading country data...</div>

    return (
        <div>
            <h1> {country.name.official}</h1>
            <div>
                Capital {country.capital}<br />
                Area {country.area}
            </div>
            <h1>Languages</h1>
            <ul>
                {Object.values(country.languages)
                    .map((lang, i) =>
                        <li key={i}>
                            {lang}
                        </li>
                    )}
            </ul>

            <img src={country.flags['png']} />

        </div>
    )
}

export default CountryProfile