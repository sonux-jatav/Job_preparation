import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const CompanyPage = () => {
  const { company } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('coding');
  const [code, setCode] = useState('// Write code here');
  const [languageId, setLanguageId] = useState(63);

  useEffect(() => {
    if (!token) return navigate('/login');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    let endpoint = '';
    if (selectedCategory === 'coding') endpoint = '/api/coding';
    else if (selectedCategory === 'mcq') endpoint = '/api/mcq';
    else if (selectedCategory === 'interview') endpoint = '/api/interview';

    axios
      .get(`${endpoint}?companyTag=${company}`, headers)
      .then((res) => setItems(res.data || [])) // ✅ safe
      .catch((err) => {
        if (err.response?.status === 401) dispatch(logout());
      });
  }, [company, token, navigate, dispatch, selectedCategory]);

  const handleSelect = (id, selected) => {
    setAnswers((prev) => ({ ...prev, [id]: selected }));
  };

  const handleSubmit = async (itemId) => {
    const selectedItem = items.find(item => item._id === itemId);
    if (!selectedItem) return alert('Item not found');

    if (selectedCategory === 'coding') {
      if (!code.trim()) return alert('Please write code');
      const res = await axios.post(
        '/api/coding/submit',
        { problemId: itemId, code, languageId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults((prev) => ({ ...prev, [itemId]: res.data }));
    } else if (selectedCategory === 'mcq') {
      if (!answers[itemId]) return alert('Please select an answer');
      const res = await axios.post(
        '/api/mcq/submit',
        { answers: [{ id: itemId, selected: answers[itemId] }] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResults((prev) => ({ ...prev, [itemId]: res.data }));
    }
  };

  const categories = [
    { id: 'coding', name: 'Coding Problems' },
    { id: 'mcq', name: 'MCQs' },
    { id: 'interview', name: 'Interview Questions' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14001f] via-[#2a003f] to-black text-white p-6">

      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">

        <h1 className="text-3xl font-semibold mb-6">{company} Preparation</h1>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setAnswers({});
            setResults({});
            setCode('// Write code here');
            setLanguageId(63);
          }}
          className="w-full p-3 mb-6 rounded-lg bg-white/10 border border-white/20 text-white"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} className="text-black">
              {cat.name}
            </option>
          ))}
        </select>

        {items.length === 0 ? (
          <p>No content available.</p>
        ) : selectedCategory === 'coding' ? (
          items.map((item) => (
            <div key={item._id} className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">

              <h2 className="text-xl mb-2">{item.title}</h2>
              <p className="text-gray-300 mb-2">{item.description}</p>

              <select
                value={languageId}
                onChange={(e) => setLanguageId(Number(e.target.value))}
                className="w-full p-2 mb-4 rounded bg-white/10"
              >
                <option value={63}>JavaScript</option>
                <option value={71}>Python</option>
                <option value={54}>C++</option>
              </select>

              <Editor
                height="30vh"
                language={languageId === 63 ? 'javascript' : languageId === 71 ? 'python' : 'cpp'}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
              />

              <button
                onClick={() => handleSubmit(item._id)}
                className="mt-4 px-6 py-2 rounded bg-gradient-to-r from-pink-600 to-red-500"
              >
                Submit
              </button>

            </div>
          ))
        ) : selectedCategory === 'mcq' ? (
          items.map((item) => (
            <div key={item._id} className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">

              <h2 className="mb-4">{item.question || "No question available"}</h2>

              {/* ✅ FIXED */}
              <div className="grid gap-3">
                {(Array.isArray(item.options) ? item.options : []).map((opt, idx) => (
                  <label
                    key={idx}
                    className={`p-3 rounded border cursor-pointer 
                      ${answers[item._id] === opt ? 'bg-purple-600' : 'bg-white/5'}`}
                  >
                    <input
                      type="radio"
                      name={item._id}
                      value={opt}
                      onChange={(e) => handleSelect(item._id, e.target.value)}
                      checked={answers[item._id] === opt}
                      className="hidden"
                    />
                    {opt}
                  </label>
                ))}
              </div>

              {!item.options && (
                <p className="text-red-400 text-sm mt-2">Options not available</p>
              )}

              <button
                onClick={() => handleSubmit(item._id)}
                className="mt-4 px-6 py-2 rounded bg-gradient-to-r from-pink-600 to-red-500"
                disabled={!answers[item._id]}
              >
                Submit
              </button>

              {/* ✅ RESULT SAFE */}
              {results[item._id] && (
                <div className="mt-4 p-3 rounded-lg bg-black/30 border border-white/10 text-sm">
                  <p>
                    Score: {results[item._id]?.score}/{results[item._id]?.total}
                  </p>

                  {(results[item._id]?.explanations || []).map((exp, idx) => (
                    <div key={idx}>
                      <p>Correct: {exp?.correct}</p>
                      <p>Your: {exp?.yourAnswer}</p>
                      <p>{exp?.explanation}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))
        ) : (
          items.map((item) => (
            <div key={item._id} className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <h2>{item.question}</h2>
              <p className="text-gray-400">Type: {item.type}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default CompanyPage;