import CountriesList from "./CountriesList"
import CountryProfile from "./CountryProfile"

const SearchResult = ({ searchQuery, getMatchQueryFun, maxQuaryMatchCount }) => {

  if (searchQuery.length == 0) {
    return <div className='instructions'>
      Specify filter to find countries by their name.</div>
  }

  const matchedNames = getMatchQueryFun()

  if (matchedNames.length === 0) {
    return <div className='instructions'>
      No match found, specify another filter.</div>
  }

  if (matchedNames.length > maxQuaryMatchCount) {
    return <div className='instructions'>
      Too many matches, specify another filter.</div>
  }

  if (matchedNames.length === 1) {
    return <CountryProfile countryName={matchedNames[0].common} />
  }

  return <CountriesList names={matchedNames} />
}

export default SearchResult