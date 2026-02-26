import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <div>
                    <h2 className="text-center text-3xl font-bold mb-8">
                        Sign in
                    </h2>
                </div>
                {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            required
                            className="form-input"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            required
                            className="form-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>
                            Sign up
                        </Link>
                    </p>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                        <Link to="/forgot-password" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                            Forgot password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
