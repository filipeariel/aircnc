import { useState } from 'react';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await api.post('/sessions', {
      email: email
    })

    const { _id } = response.data

    localStorage.setItem('user', _id)

    navigate('/dashboard')
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e econtre <strong>talentos</strong> para sua empresa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  )
}