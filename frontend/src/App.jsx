import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const API_BASE_URL = 'https://server-test-12.onrender.com/api'

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`)
      const data = await response.json()
      if (response.ok) {
        setUsers(data.users)
      } else {
        setMessage('Failed to fetch users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setMessage('Error connecting to server')
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setMessage('Please fill in both name and email')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setMessage('User saved successfully!')
        setName('')
        setEmail('')
        fetchUsers() // Refresh the users list
      } else {
        setMessage(data.message || 'Failed to save user')
      }
    } catch (error) {
      console.error('Error saving user:', error)
      setMessage('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Backend Test - User Management</h1>
      
      {/* User Form */}
      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Add New User</h2>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Save User'}
          </button>
        </form>
        
        {message && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
            color: message.includes('successfully') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '4px'
          }}>
            {message}
          </div>
        )}
      </div>

      {/* Users List */}
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>All Users ({users.length})</h2>
          <button
            onClick={fetchUsers}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh
          </button>
        </div>
        
        {users.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            No users found. Add some users using the form above.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {users.map((user) => (
              <div
                key={user._id}
                style={{
                  padding: '15px',
                  border: '1px solid #eee',
                  borderRadius: '6px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  {user.name}
                </div>
                <div style={{ color: '#666' }}>
                  {user.email}
                </div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                  ID: {user._id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
