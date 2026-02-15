import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-icon">
                    <Lock size={32} />
                </div>
                <h2>Admin Login</h2>
                <p>Please sign in to access the dashboard</p>

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@culturehub.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="confirm-btn">Sign In</button>
                </form>

                <div className="login-footer">
                    <p>Demo Credentials:</p>
                    <small>admin@culturehub.com / admin123</small>
                </div>
            </div>
        </div>
    );
};

export default Login;
