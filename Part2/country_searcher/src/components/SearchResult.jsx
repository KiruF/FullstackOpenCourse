import CountryProfile from "./CountryProfile"

const SearchResult = ({ searchQuery, getMatchQueryFun, maxQuaryMatchCount }) => {

  const textItalic = { fontStyle: 'italic' }

  if (searchQuery.length == 0) {
    return <div style={textItalic}>
      Specify filter to find countries by their name.</div>
  }

  const matchedNames = getMatchQueryFun()

  if (matchedNames.length === 0) {
    return <div style={textItalic}>
      No match found, specify another filter.</div>
  }

  if (matchedNames.length > maxQuaryMatchCount) {
    return <div style={textItalic}>
      Too many matches, specify another filter.</div>
  }

  if (matchedNames.length === 1) {    
    return <CountryProfile countryName={matchedNames[0].common} />
  }

  return (
    <ul>
      {matchedNames.map(countryName =>
        <li key={countryName.common}>
          {countryName.common}
        </li>)}
    </ul>
  )
}

export default SearchResult