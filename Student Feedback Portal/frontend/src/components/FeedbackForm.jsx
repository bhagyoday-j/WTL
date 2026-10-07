import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const initialForm = { studentName: '', courseName: '', rating: '5', comments: '' }

function FeedbackForm({ onSubmitted, editingFeedback, onCancelEdit }) {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingFeedback) {
      setForm({
        studentName: editingFeedback.student_name || '',
        courseName: editingFeedback.course_name || '',
        rating: String(editingFeedback.rating || '5'),
        comments: editingFeedback.comments || ''
      })
    } else {
      setForm(initialForm)
    }
  }, [editingFeedback])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setIsSubmitting(true)

    try {
      if (editingFeedback) {
        await axios.post(`${API_URL}/update_feedback.php`, {
          ...form,
          id: editingFeedback.id
        })
      } else {
        await axios.post(`${API_URL}/add_feedback.php`, form)
      }
      setForm(initialForm)
      onSubmitted()
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Action failed. Check that the PHP API is running.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="panel">
      <h2>{editingFeedback ? 'Edit feedback' : 'Leave feedback'}</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="studentName">Student name</label>
          <input
            id="studentName"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            required
            placeholder="e.g. Maya Patel"
          />
        </p>

        <p>
          <label htmlFor="courseName">Course name</label>
          <select
            id="courseName"
            name="courseName"
            value={form.courseName}
            onChange={handleChange}
            required
          >
            <option value="">Choose a course</option>
            <option>Web Technologies</option>
            <option>Data Structures</option>
            <option>Database Management</option>
            <option>Software Engineering</option>
            <option>Computer Networks</option>
          </select>
        </p>

        <fieldset>
          <legend>Rating</legend>
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating}>
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={form.rating === String(rating)}
                onChange={handleChange}
              />
              {rating}
            </label>
          ))}
        </fieldset>

        <p>
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={form.comments}
            onChange={handleChange}
            required
            minLength="5"
            placeholder="What should the teaching team know?"
          />
        </p>

        {message && (
          <p className="form-message" role="alert">
            {message}
          </p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting 
            ? (editingFeedback ? 'Updating...' : 'Sending...') 
            : (editingFeedback ? 'Update feedback' : 'Submit feedback')}
        </button>

        {editingFeedback && (
          <button type="button" onClick={onCancelEdit}>Cancel</button>
        )}
      </form>
    </section>
  )
}

export default FeedbackForm