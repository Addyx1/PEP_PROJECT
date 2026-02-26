import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ExplanationResult = ({ explanation }) => {
    if (!explanation) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
            <div className="card" style={{ borderLeft: '4px solid var(--accent-coral)' }}>
                <h3 className="text-xl font-bold mb-2">Code Explanation</h3>
                <p className="text-gray-600">{explanation.explanationSummary || 'No explanation available.'}</p>
            </div>

            <div className="card">
                <h3 className="text-xl font-bold mb-4">Line-by-Line Breakdown</h3>
                {explanation.detailedExplanation && explanation.detailedExplanation.length > 0 ? (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {explanation.detailedExplanation.map((line, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <span style={{ flexShrink: 0, backgroundColor: '#e0e7ff', color: '#3730a3', fontSize: '0.75rem', fontWeight: 600, marginRight: '0.5rem', padding: '0.125rem 0.625rem', borderRadius: '0.25rem', marginTop: '0.25rem' }}>
                                    {index + 1}
                                </span>
                                <span className="text-gray-600">{line}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">No line-by-line breakdown available.</p>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="card">
                    <h3 className="text-xl font-bold mb-2">Complexity Analysis</h3>
                    <p style={{ fontFamily: 'monospace', backgroundColor: 'rgba(45,42,38,0.04)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--text-secondary)' }}>
                        {explanation.complexityAnalysis || 'Complexity analysis not available.'}
                    </p>
                </div>

                <div className="card">
                    <h3 className="text-xl font-bold mb-2">Improvements</h3>
                    {explanation.improvements && explanation.improvements.length > 0 ? (
                        <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {explanation.improvements.map((imp, index) => (
                                <li key={index}>{imp}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No improvements suggested.</p>
                    )}
                </div>
            </div>

            {explanation.issues && explanation.issues.length > 0 && (
                <div className="card" style={{ borderLeft: '4px solid #f97316' }}>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#c2410c' }}>⚠️ Potential Issues</h3>
                    <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                        {explanation.issues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                        ))}
                    </ul>
                </div>
            )}

            {explanation.optimizedCode && (
                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Optimized Code</h3>
                    <div style={{ borderRadius: '0.375rem', overflow: 'hidden' }}>
                        <SyntaxHighlighter language={explanation.language || 'javascript'} style={atomDark}>
                            {explanation.optimizedCode}
                        </SyntaxHighlighter>
                    </div>
                </div>
            )}

        </motion.div>
    );
};

export default ExplanationResult;
