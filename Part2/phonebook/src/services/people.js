import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    return axios
        .post(baseUrl, newObject)
        .then(responsne => responsne.data)
}

const update = (id, newObject) => {
    return axios
        .put(baseUrlCombineWith(id), newObject)
        .then(response => response.data)
}

const deleteAt = (id) => {
    return axios
        .delete(baseUrlCombineWith(id))
        .then(response => response.data)
}

const baseUrlCombineWith = (address) =>
    `${baseUrl}/${address}`

export default {
    getAll,
    create,
    update,
    deleteAt
}