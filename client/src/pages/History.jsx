import { useState, useEffect } from 'react';
import api from '../utils/api';

const History = () => {
    const [explanations, setExplanations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState('');

    useEffect(() => {
        fetchHistory();
    }, [search, language]);

    const fetchHistory = async () => {
        try {
            let query = `/explanations?sort=newest`;
            if (search) query += `&search=${search}`;
            if (language) query += `&language=${language}`;

            const res = await api.get(query);
            setExplanations(res.data.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/explanations/${id}`);
            setExplanations(explanations.filter((exp) => exp._id !== id));
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Explanation History</h1>
            </div>

            <div className="card mb-8" style={{ display: 'flex', flexDirection: 'row', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="form-input"
                    style={{ flex: 1 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="form-select"
                    style={{ width: 'auto' }}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">All Languages</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                    <option value="typescript">TypeScript</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: '#ef4444' }}>{error}</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {explanations.map((exp) => (
                        <div key={exp._id} className="card" style={{ transition: 'box-shadow 0.2s', cursor: 'default' }}>
                            <div className="flex justify-between items-start mb-4">
                                <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', fontSize: '0.75rem', fontWeight: 600, padding: '0.125rem 0.625rem', borderRadius: '0.25rem' }}>
                                    {exp.language}
                                </span>
                                <button
                                    onClick={() => handleDelete(exp._id)}
                                    className="btn-danger"
                                    style={{ fontSize: '0.875rem', border: 'none', background: 'none', cursor: 'pointer' }}
                                >
                                    Delete
                                </button>
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.title}</h3>
                            <p className="text-gray-600 mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontSize: '0.875rem' }}>{exp.explanationSummary}</p>
                            <div className="flex justify-between items-center text-gray-500" style={{ fontSize: '0.875rem' }}>
                                <span>{new Date(exp.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}

                    {explanations.length === 0 && (
                        <p className="text-gray-500 text-center" style={{ gridColumn: '1 / -1' }}>No explanations found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default History;
