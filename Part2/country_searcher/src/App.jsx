import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import SearchResult from './components/SearchResult'

const App = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [countriesNames, setCountriesNames] = useState([])

  useEffect(() => {
    countriesService
      .getAllNames()
      .then(allCountriesNames =>
        setCountriesNames(allCountriesNames))
      .catch(error =>
        console.log(`useEffect error: ${error}`))
  }, [])

  const getMatchQuery = () => {
    const queryLower = searchQuery.toLowerCase()
    return (
      queryLower.length == 0
        ? countriesNames
        : countriesNames.filter(countryName =>
          countryName.common.toLowerCase().includes(queryLower))
    )
  }

  return (
    <div>

      find countries
      <input
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)} />

      <SearchResult
        searchQuery={searchQuery}
        getMatchQueryFun={getMatchQuery}
        maxQuaryMatchCount={10} />

    </div>
  )
}

export default App