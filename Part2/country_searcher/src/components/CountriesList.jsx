import CountryProfile from "./CountryProfile"
import { useState } from "react"

const CountriesList = ({ names }) => {

    const [nameToShow, setNameToShow] = useState('')

    if (nameToShow.length > 0) {
        return <CountryProfile countryName={nameToShow} />
    }
    else {
        return (
            <ul>
                {names.map(currentName =>
                    <li key={currentName.common}>

                        {currentName.common}

                        <button
                            onClick={() => setNameToShow(currentName.common)}>
                            Show
                        </button>

                    </li>)}
            </ul>
        )
    }
}

export default CountriesList