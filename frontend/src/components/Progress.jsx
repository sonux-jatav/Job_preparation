import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Progress = () => {
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])

  // 🔥 NEW STATE (animation)
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    if (!token) return navigate('/login')
    axios.get('/api/progress', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setSubmissions(res.data || []))
      .catch(err => {
        if (err.response?.status === 401) dispatch(logout())
      })
  }, [token, navigate, dispatch])

  // 🔥 RANDOM 50–60
  useEffect(() => {
    const target = Math.floor(Math.random() * 11) + 50
    let start = 0

    const interval = setInterval(() => {
      start += 1
      if (start >= target) {
        start = target
        clearInterval(interval)
      }
      setProgressValue(start)
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const demoData = [
    { date: "1", score: 60 },
    { date: "2", score: 70 },
    { date: "3", score: 65 },
    { date: "4", score: 80 },
    { date: "5", score: 75 },
  ]

  const chartData = submissions.length
    ? submissions.filter(s => s.problemType === 'mcq').map(s => ({
        date: new Date(s.timestamp).toLocaleDateString(),
        score: s.score
      }))
    : demoData

  const total = submissions.length || 20
  const mcq = submissions.filter(s => s.problemType === 'mcq').length || 14
  const coding = submissions.filter(s => s.problemType === 'coding').length || 13
  const interview = submissions.filter(s => s.problemType === 'interview').length || 18

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14001f] via-[#2a003f] to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-4xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-3xl font-semibold text-center mb-8">Your Progress</h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 bg-white/5 p-6 rounded-xl border border-white/10">

          {/* 🔥 ANIMATED CIRCLE */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">

              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#grad)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * progressValue) / 100}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
                <defs>
                  <linearGradient id="grad">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                {progressValue}%
              </div>

            </div>

            <p className="mt-2 text-white/70">Progress</p>
          </div>

          {/* Middle */}
          <div>
            <p className="text-cyan-400 text-lg font-semibold">Completed</p>
            <p className="text-xl">{mcq} / {total} Questions</p>
          </div>

          {/* Right */}
          <div>
            <p className="text-cyan-400 text-lg font-semibold">Accuracy</p>
            <p className="text-2xl font-bold">80%</p>
          </div>

        </div>

        {/* BARS */}
        <div className="space-y-4 mb-8">

          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="flex justify-between mb-1">
              <span>MCQs</span>
              <span>80%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded">
              <div className="h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded w-[80%]" />
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="flex justify-between mb-1">
              <span>Coding</span>
              <span>65%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded w-[65%]" />
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="flex justify-between mb-1">
              <span>Interview Preparation</span>
              <span>90%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded">
              <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded w-[90%]" />
            </div>
          </div>

        </div>

        {/* CHART */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#ec4899" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  )
}

export default Progress