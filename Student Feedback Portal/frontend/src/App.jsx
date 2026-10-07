import { useState } from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import './App.css'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [editingFeedback, setEditingFeedback] = useState(null)

  const handleSubmitted = () => {
    setRefreshKey((key) => key + 1)
    setEditingFeedback(null)
  }

  const handleEdit = (item) => {
    setEditingFeedback(item)
    window.scrollTo({ top: 0 })
  }

  return (
    <main className="app-shell">
      <h1>Student Feedback Portal</h1>
      <section className="portal-grid">
        <FeedbackForm 
          onSubmitted={handleSubmitted} 
          editingFeedback={editingFeedback}
          onCancelEdit={() => setEditingFeedback(null)}
        />
        <FeedbackList 
          refreshKey={refreshKey} 
          onEdit={handleEdit}
          onDeleted={() => setRefreshKey((key) => key + 1)}
        />
      </section>
    </main>
  )
}

export default App