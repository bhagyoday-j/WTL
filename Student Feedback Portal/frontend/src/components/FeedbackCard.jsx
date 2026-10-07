function FeedbackCard({ feedback, onEdit, onDelete }) {
  const { 
    student_name: studentName, 
    course_name: courseName, 
    rating, 
    comments, 
    created_at: createdAt 
  } = feedback

  const date = createdAt 
    ? new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) 
    : ''

  return (
    <article className="feedback-card">
      <h3>{studentName}</h3>
      <p>{courseName}</p>
      <p aria-label={`${rating} out of 5 stars`}>
        {'★'.repeat(Number(rating))}
        {'☆'.repeat(5 - Number(rating))}
      </p>
      <p>{comments}</p>
      <small>{date}</small>

      <p>
        <button onClick={onEdit}>Edit</button>{' '}
        <button onClick={onDelete}>Delete</button>
      </p>
    </article>
  )
}

export default FeedbackCard