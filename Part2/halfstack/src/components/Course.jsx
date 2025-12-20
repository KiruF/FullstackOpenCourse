const TotalExercises = ({ parts }) => {
    const initialValue = 0
    const total =
        parts.reduce((sum, part) => sum + part.exercises, initialValue)

    return (
        <p><b>{`total of ${total} exercises`}</b></p>
    )
}

const Parts = ({ parts }) =>
    <div>
        {parts.map(part =>
            <p key={part.id}>
                {part.name} {part.exercises}
            </p>)
        }
    </div>

const Course = ({ course }) =>
    <div>
        <h1>{course.name}</h1>
        <Parts parts={course.parts} />
        <TotalExercises parts={course.parts} />
    </div>

export default Course