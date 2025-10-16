import React from 'react'
import { useUserViewModel } from '../viewmodels/useUserViewModel'

export default function UserForm() {
  const { user, setField, save, loading, error, success } = useUserViewModel()

  return (
    <div style={{ maxWidth: 480 }}>
      <div className="input">
        <label>Name</label>
        <input value={user.name} onChange={e => setField('name', e.target.value)} />
      </div>

      <div className="input">
        <label>Email</label>
        <input value={user.email} onChange={e => setField('email', e.target.value)} />
      </div>

      <button onClick={save} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>

      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
    </div>
  )
}
