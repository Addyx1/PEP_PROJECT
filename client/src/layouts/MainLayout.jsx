import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';

const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="layout">
            {/* Navbar */}
            <nav className="navbar">
                <div className="container">
                    <div className="flex justify-between items-center" style={{ height: '64px' }}>
                        <div className="flex items-center">
                            <Link to="/" className="navbar-brand">
                                AI Code Explainer
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="theme-toggle"
                                aria-label="Toggle theme"
                            >
                                {darkMode ? <HiSun size={24} /> : <HiMoon size={24} />}
                            </button>
                            {user ? (
                                <div className="flex gap-2 items-center">
                                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                    <Link to="/history" className="nav-link">History</Link>
                                    <Link to="/analytics" className="nav-link">Analytics</Link>
                                    <button onClick={handleLogout} className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link to="/login" className="nav-link">Login</Link>
                                    <Link to="/register" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', flexGrow: 1 }}>
                {children}
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: 'var(--white)', borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem', paddingBottom: '1.5rem', marginTop: 'auto' }}>
                <div className="container">
                    <p className="text-center text-gray-500" style={{ fontSize: '0.875rem' }}>
                        &copy; {new Date().getFullYear()} AI Code Explainer. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
