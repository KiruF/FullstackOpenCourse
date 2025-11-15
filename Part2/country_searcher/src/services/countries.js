import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAllNames = () => {
    return axios
        .get(`${baseUrl}/api/all`)
        .then(response => response.data
            .map(country => country.name)
        )
}

const getByName = (name) => {
    var url = `${baseUrl}api/name/${name}`
    return axios
        .get(url)
        .then(response => response.data)
}

export default {
    getAllNames: getAllNames,
    getByName: getByName
}