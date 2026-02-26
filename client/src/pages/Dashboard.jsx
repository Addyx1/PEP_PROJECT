import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import ExplanationResult from '../components/ExplanationResult';
import api from '../utils/api';

const Dashboard = () => {
    const [code, setCode] = useState('// Paste your code here\nconsole.log("Hello World");');
    const [language, setLanguage] = useState('javascript');
    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState(null);
    const [error, setError] = useState('');

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        setExplanation(null); // reset old result when changing language
        setError('');
    };

    const handleExplain = async () => {
        setLoading(true);
        setError('');
        setExplanation(null);

        try {
            const res = await api.post('/explanations', {
                code,
                language,
            });
            // Attach language to the result for SyntaxHighlighter
            setExplanation({ ...res.data.data, language });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate explanation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Code Explainer</h1>
                <p className="text-gray-600 mt-4">Paste your code below to get an instant AI-powered explanation.</p>
            </div>

            <div className="card mb-8">
                <div className="form-group mb-4">
                    <label className="form-label mb-4">Language</label>
                    <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e)}
                        className="form-select"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="go">Go</option>
                        <option value="rust">Rust</option>
                        <option value="typescript">TypeScript</option>
                    </select>
                </div>

                <div className="mb-8">
                    <label className="form-label mb-4">Code Snippet</label>
                    <CodeEditor code={code} setCode={setCode} language={language} />
                </div>

                <div className="flex justify-between items-center">
                    <button
                        onClick={handleExplain}
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Analyzing...
                            </>
                        ) : 'Explain Code'}
                    </button>
                    {error && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</p>}
                </div>
            </div>

            <ExplanationResult explanation={explanation} />
        </div>
    );
};

export default Dashboard;
