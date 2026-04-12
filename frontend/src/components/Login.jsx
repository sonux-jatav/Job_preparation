import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      dispatch(setCredentials({ token: res.data.token, role: res.data.role }))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Error')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#14001f] via-[#2a003f] to-black text-white">

      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-pink-600 opacity-20 rounded-full blur-[150px] top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 rounded-full blur-[150px] bottom-[-100px] right-[-100px]"></div>

      {/* Card */}
      <form 
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >

        {/* Icon + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-2xl mb-3">
            🔒
          </div>
          <h2 className="text-3xl font-semibold">Log In</h2>
        </div>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-2 relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Forgot */}
        <div className="text-right text-sm mb-4">
          <Link to="/forgot" className="text-white/70 hover:text-white">
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:scale-105 transition"
        >
          Log In
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-white/70">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-pink-400 hover:underline">
            Sign Up
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Login