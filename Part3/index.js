const express = require('express')
const app = express()

app.use(express.json())

let personsArray = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const root = '/api'
const personsRoute = `${root}/persons`

app.get(personsRoute, (request, response) => {
    response.json(personsArray)
})

app.get(`${root}/info`, (reqest, response) => {
    const recievalTime = Date()
    response.send(
        `Phonebook has info for ${personsArray.length} people<br>${recievalTime}`
    )
})

app.get(`${personsRoute}/:id`, (request, response) => {
    const id = request.params.id
    const person = personsArray
        .find(person => person.id === id)

    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.delete(`${personsRoute}/:id`, (reqest, response) => {
    const id = reqest.params.id
    const expectedCount = personsArray.length - 1

    personsArray = personsArray
        .filter(person => person.id !== id)

    if (expectedCount === personsArray.length)
        response.status(204).end()
    else
        response.status(404).end()
})

const generateId = () => {
    const maxId = 314159
    const newId = Math.round(
        Math.random() * maxId
    )

    return String(newId)
}

const validateNewPersonInfo = (name, number) => {
    if (!name)
        return {isValid: false, errorMessage: 'name missing'}

    if (!number)
        return {isValid: false, errorMessage: 'phone number missing'}

    const nameExists = personsArray
        .find(person => person.name === name)
    if(nameExists)
        return {isValid: false, errorMessage: 'name must be unique'}

    return {isValid: true}
}

app.post(`${personsRoute}`, (request, response) => {
    const { name, number } = request.body

    const {isValid, errorMessage} = validateNewPersonInfo(name, number)

    if(!isValid)
        return response.status(400).json({error: errorMessage})

    const newPerson = {
        id: generateId(),
        name: name,
        number: number
    }

    personsArray = personsArray.concat(newPerson)

    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})