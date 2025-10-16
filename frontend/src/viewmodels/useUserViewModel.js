import { useState } from 'react'
import { createUser as createUserModel } from '../models/userModel'
import * as api from '../services/api'

export function useUserViewModel() {
  const [user, setUser] = useState(createUserModel())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  function setField(field, value) {
    setUser(prev => ({ ...prev, [field]: value }))
  }

  async function save() {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const data = await api.createUser(user)
      setSuccess(data.message || 'Saved')
      setUser(createUserModel())
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    setField,
    save,
    loading,
    error,
    success
  }
}
