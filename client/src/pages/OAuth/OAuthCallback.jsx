import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [phoneRequired, setPhoneRequired] = useState(false);
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchUserAndRedirect = async () => {
            const token = searchParams.get('token');
            const code = searchParams.get('code');
            const state = searchParams.get('state');
            
            if (!token && (!code || !state)) {
                setError('Missing authentication data');
                navigate('/login');
                return;
            }
            
            try {
                // Handle OAuth callback if code and state are present
                if (code && state) {
                    const response = await authService.handleOAuthCallback(code, state);
                    if (response.token) {
                        // Store the token
                        localStorage.setItem('token', response.token);
                    } else {
                        throw new Error('No token received from OAuth callback');
                    }
                } else if (token) {
                    // If we received a token directly (old flow), store it
                    localStorage.setItem('token', token);
                }
                
                // Fetch user data to determine role
                const userData = await authService.getCurrentUser();
                const user = userData.user || userData;

                // Check if this is a new user (needs to complete signup)
                if (!user.phone || !user.birthDate || !user.gender) {
                    // Store token temporarily
                    localStorage.setItem('temp_token', token || localStorage.getItem('token'));
                    navigate('/signup/complete');
                    return;
                }

                // For existing users, proceed with normal login
                login(token || localStorage.getItem('token'));

                // Redirect based on user role
                const rolePaths = {
                    'customer': '/cust-home',
                    'service_agent': '/agent-home',
                    'admin': '/admin-home'
                };

                const redirectPath = rolePaths[user.role] || '/login';
                navigate(redirectPath);
            } catch (error) {
                console.error('Error in OAuth callback:', error);
                setError('Authentication failed. Please try again.');
                navigate('/login');
            }
        };

        fetchUserAndRedirect();
    }, [searchParams, navigate, login]);    
    
    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = searchParams.get('token') || localStorage.getItem('temp_token');
            
            // Use authService to complete OAuth signup
            const response = await authService.completeOAuthSignup({ 
                phone,
                token
            });

            // After successful phone number submission, proceed with login
            login(response.token || token);
            navigate('/cust-home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column',
            gap: '20px'
        }}>
            {phoneRequired ? (
                <div className="phone-form-container">
                    <h2>One Last Step</h2>
                    <p>Please provide your phone number to complete signup</p>
                    <form onSubmit={handlePhoneSubmit}>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            required
                        />
                        <button type="submit">Complete Signup</button>
                    </form>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
            ) : (
                <>
                    <div>Processing login...</div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </>
            )}
        </div>
    );
};

export default OAuthCallback;
