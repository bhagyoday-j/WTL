import { useEffect, useState } from 'react'
import axios from 'axios'
import FeedbackCard from './FeedbackCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function FeedbackList({ refreshKey, onEdit, onDeleted }) {
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this feedback?')) {
      return
    }

    try {
      await axios.post(`${API_URL}/delete_feedback.php`, { id })
      onDeleted()
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to delete feedback.')
    }
  }

  useEffect(() => {
    const loadFeedback = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${API_URL}/get_feedback.php`)
        setFeedback(Array.isArray(response.data) ? response.data : [])
        setError('')
      } catch {
        setError('The feed is waiting for the PHP API at ' + API_URL)
      } finally {
        setIsLoading(false)
      }
    }

    loadFeedback()
  }, [refreshKey])

  return (
    <section className="panel">
      <h2>Recent feedback</h2>
      <p>{feedback.length} responses</p>

      {isLoading && (
        <p>Gathering the latest responses...</p>
      )}

      {!isLoading && error && (
        <p role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && feedback.length === 0 && (
        <p>
          No feedback yet. Your perspective can start the conversation.
        </p>
      )}

      {!isLoading && !error && feedback.length > 0 && (
        <div>
          {feedback.map((item) => (
            <FeedbackCard
              key={item.id}
              feedback={item}
              onEdit={() => onEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default FeedbackList