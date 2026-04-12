import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Dashboard = () => {
  const { token, role } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const companies = ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'IBM', 'Accenture']

  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#1a001f] to-black text-white overflow-hidden">

      <div className="absolute top-[-100px] left-[200px] w-[500px] h-[500px] bg-pink-600 opacity-20 blur-[150px] rounded-full"></div>

      <div className="flex justify-between items-center px-10 py-6 relative z-10">
        <h1 className="text-xl font-semibold">The Placement Preparation</h1>
        <button onClick={handleLogout} className="border px-4 py-2 rounded-lg hover:bg-white/10">
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-20 px-10 mt-10 items-start relative z-10">

        {/* LEFT */}
        <div>
          <h1 className="text-[56px] md:text-[72px] font-bold leading-tight">
            Crack Placements.
            <br />
            <span className="text-pink-500">
              General & Company Specific.
            </span>
          </h1>

          <div className="mt-6 text-gray-300 text-lg space-y-2">
            <p>AI-powered interview preparation platform.</p>
            <p>Practice general aptitude and company-specific questions.</p>
            <p>Get ready faster and smarter.</p>
          </div>

          <div className="flex gap-4 mt-8 flex-wrap">
            <button
              onClick={() => setActiveSection('general')}
              className="bg-gradient-to-r from-pink-600 to-red-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Start General Prep →
            </button>

            <button
              onClick={() => setActiveSection('company')}
              className="border border-white/30 px-6 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Company Specific Prep →
            </button>

            <button
              onClick={() => navigate('/progress')}
              className="border border-purple-400 text-purple-300 px-6 py-3 rounded-lg hover:bg-purple-500/10 transition"
            >
              View Progress →
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <AnimatePresence mode="wait">

            {activeSection === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl mb-4 font-semibold">General Preparation</h2>

                <div className="grid gap-4">

                  <div
                    onClick={() => navigate('/mcq')}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md cursor-pointer hover:scale-105 hover:bg-white/10 transition"
                  >
                    MCQs
                  </div>

                  <div
                    onClick={() => navigate('/coding')}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md cursor-pointer hover:scale-105 hover:bg-white/10 transition"
                  >
                    Coding
                  </div>

                  <div
                    onClick={() => navigate('/interview')}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md cursor-pointer hover:scale-105 hover:bg-white/10 transition"
                  >
                    Interview Q&A
                  </div>

                </div>
              </motion.div>
            )}

            {activeSection === 'company' && (
              <motion.div
                key="company"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl mb-4 font-semibold">Company Preparation</h2>

                <div className="grid grid-cols-2 gap-3">
                  {companies.map(company => (
                    <div
                      key={company}
                      onClick={() => navigate(`/company/${company}`)}
                      className="bg-white/5 border border-white/10 rounded-lg p-4 text-center cursor-pointer hover:scale-105 hover:bg-white/10 transition"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      <div className="absolute bottom-6 w-full text-center text-xs tracking-widest text-gray-500">
        ONE PLATFORM FOR TECHNICAL PREPARATION • APTITUDE TESTS • CODING QUESTIONS • MOCK INTERVIEWS
      </div>

    </div>
  )
}

export default Dashboard