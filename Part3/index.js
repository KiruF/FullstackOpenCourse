const express = require('express')
const app = express()

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

    if(person)
        response.json(person)
    else
        response.status(404).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)    
})