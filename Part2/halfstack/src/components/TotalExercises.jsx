const TotalExercises = ({ parts }) => {

    const initialValue = 0
    const total =
        parts.reduce((sum, part) => sum + part.exercises, initialValue)

    return (
        <p><b>{`total of ${total} exercises`}</b></p>
    )
}

export default TotalExercises