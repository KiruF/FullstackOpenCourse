const Person = ({ person, deletionHandler }) =>
    <li>        
        {person.name} {person.number}
        <button onClick={deletionHandler}>Delete</button>
    </li>

export default Person
