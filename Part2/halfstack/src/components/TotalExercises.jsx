const Sum = (numbers) => {
    let sum = 0
    numbers.forEach(number => {
        sum += number
    })

    return sum
}

const TotalExercises = ({ exercises }) =>
    <p>
        <b>{`total of ${Sum(exercises)} exercises`}</b>
    </p>

export default TotalExercises