import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const McqPractice = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mcqs, setMcqs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    if (!token) return navigate('/login');
    axios
      .get('/api/mcq', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setMcqs(res.data || [])) // ✅ safe
      .catch((err) => {
        if (err.response?.status === 401) dispatch(logout());
        console.error('Error fetching MCQs:', err);
      });
  }, [token, navigate, dispatch]);

  const handleSelect = (id, selected) => {
    setAnswers((prev) => ({ ...prev, [id]: selected }));
  };

  const handleSubmit = async (mcqId) => {
    if (!answers[mcqId]) return alert('Please select an answer');
    try {
      const res = await axios.post(
        '/api/mcq/submit',
        { answers: [{ id: mcqId, selected: answers[mcqId] }] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults((prev) => ({ ...prev, [mcqId]: res.data }));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#14001f] via-[#2a003f] to-[#000] text-white p-6">

      <div className="w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-lg">?</div>
          <h1 className="text-2xl font-semibold">Quiz</h1>
        </div>

        {mcqs.length === 0 ? (
          <p>No MCQs available.</p>
        ) : (
          mcqs.map((mcq) => (
            <div
              key={mcq._id}
              className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <p className="mb-4 text-lg">{mcq.question}</p>

              {/* ✅ SAFE OPTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(mcq.options || []).map((opt, idx) => (
                  <label
                    key={idx}
                    className={`p-3 rounded-lg border cursor-pointer transition 
                      ${answers[mcq._id] === opt 
                        ? 'bg-purple-600 border-purple-400' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                  >
                    <input
                      type="radio"
                      name={mcq._id}
                      value={opt}
                      onChange={(e) => handleSelect(mcq._id, e.target.value)}
                      checked={answers[mcq._id] === opt}
                      className="hidden"
                    />
                    {opt}
                  </label>
                ))}
              </div>

              <button
                onClick={() => handleSubmit(mcq._id)}
                className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-red-500 hover:scale-105 transition"
                disabled={!answers[mcq._id]}
              >
                Submit
              </button>

              {/* ✅ SAFE RESULT */}
              {results[mcq._id] && (
                <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10 text-sm">
                  <p className="mb-2">
                    Score: {results[mcq._id]?.score}/{results[mcq._id]?.total}
                  </p>

                  {(results[mcq._id]?.explanations || []).map((exp, idx) => (
                    <div key={idx} className="mb-2">
                      <p>Correct: {exp?.correct}</p>
                      <p>Your: {exp?.yourAnswer}</p>
                      <p className="text-gray-300">Explanation: {exp?.explanation}</p>
                      <p className={exp?.correct ? 'text-green-400' : 'text-red-400'}>
                        {exp?.correct ? 'Correct' : 'Wrong'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default McqPractice;