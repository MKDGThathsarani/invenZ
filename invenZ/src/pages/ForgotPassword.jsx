import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const { success, error } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await forgotPassword(email);
      setSubmitted(true);
      success('Password reset link sent to your email!');
    } catch (err) {
      error(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="forgot-password-page">
        <div className="card">
          <div className="success-icon">✅</div>
          <h2>Check Your Email</h2>
          <p>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="hint">
            Didn't receive the email? Check your spam folder or 
            <button 
              className="link-btn" 
              onClick={() => setSubmitted(false)}
            >
              try again
            </button>
          </p>
          <Link to="/login" className="btn-primary">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page">
      <div className="card">
        <h2>🔐 Forgot Password</h2>
        <p>Enter your email address and we'll send you a reset link</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="footer-links">
          <Link to="/login">← Back to Login</Link>
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;