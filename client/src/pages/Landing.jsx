import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-page">
            {/* Floating Background Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-grid">
                        {/* Left Side - Content */}
                        <div className="hero-content">
                            <div className="hero-badge">
                                <span className="badge-icon">✨</span>
                                Built for Developers
                            </div>

                            <h1 className="hero-title">
                                Understand Code
                                <span className="gradient-text">Instantly with AI</span>
                            </h1>

                            <p className="hero-subtitle">
                                Paste any code snippet and get an instant explanation, complexity analysis, and optimization suggestions powered by advanced AI.
                            </p>

                            <div className="hero-cta">
                                <Link to="/dashboard" className="btn btn-gradient">
                                    Try It Now
                                    <span className="btn-arrow">→</span>
                                </Link>
                                <Link to="/dashboard" className="btn btn-ghost">
                                    See Demo
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <div className="stat-value">10K+</div>
                                    <div className="stat-label">Explanations</div>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <div className="stat-value">99%</div>
                                    <div className="stat-label">Accuracy</div>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <div className="stat-value">5sec</div>
                                    <div className="stat-label">Avg Response</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Code Editor Mockup */}
                        <div className="hero-mockup">
                            <div className="code-mockup-container">
                                <div className="code-mockup-header">
                                    <div className="code-dots">
                                        <span className="dot dot-red"></span>
                                        <span className="dot dot-yellow"></span>
                                        <span className="dot dot-green"></span>
                                    </div>
                                    <div className="code-filename">example.js</div>
                                </div>
                                <div className="code-mockup-body">
                                    <pre><code>{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + 
         fibonacci(n - 2);
}`}</code></pre>
                                    <div className="code-explanation-preview">
                                        <div className="explanation-icon">🧠</div>
                                        <div className="explanation-text">
                                            <strong>AI Analysis:</strong> Recursive Fibonacci with O(2^n) complexity...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Powerful Features</h2>
                    <p className="section-subtitle">Everything you need to understand and improve your code</p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #FF9E80 0%, #FFB4A2 100%)' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Instant Explanation</h3>
                            <p className="feature-description">
                                Get immediate, line-by-line explanations of any code snippet in seconds.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #B794F6 0%, #E0C3FC 100%)' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Complexity Analysis</h3>
                            <p className="feature-description">
                                Understand time and space complexity with detailed algorithmic insights.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #FFB4A2 0%, #FFC9D6 100%)' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </div>
                            <h3 className="feature-title">Smart Suggestions</h3>
                            <p className="feature-description">
                                Receive optimization recommendations and best practice improvements.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #FFC9D6 0%, #E0C3FC 100%)' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <line x1="10" y1="9" x2="8" y2="9" />
                                </svg>
                            </div>
                            <h3 className="feature-title">History Tracking</h3>
                            <p className="feature-description">
                                Review and revisit all your previous code explanations anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2 className="cta-title">Ready to understand your code better?</h2>
                        <p className="cta-subtitle">Join thousands of developers using AI Code Explainer</p>
                        <div className="cta-buttons">
                            <Link to="/register" className="btn btn-gradient btn-large">
                                Get Started Free
                                <span className="btn-arrow">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <span className="footer-logo">AI Code Explainer</span>
                            <p className="footer-tagline">Making code understandable for everyone</p>
                        </div>
                        <div className="footer-links">
                            <Link to="/">Home</Link>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Sign Up</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 AI Code Explainer. Built with ❤️ for developers.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
