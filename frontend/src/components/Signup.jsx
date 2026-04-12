import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signup', { name, email, password });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
    }
  };

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
            👤
          </div>
          <h2 className="text-3xl font-semibold">Sign Up</h2>
        </div>

        {message && <p className="text-green-400 mb-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <span className="absolute right-3 top-3 opacity-60">👁️</span>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-600 to-red-500 font-semibold hover:scale-105 transition"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-white/70">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 hover:underline">
            Log In
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Signup;