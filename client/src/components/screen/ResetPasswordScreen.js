import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ResetPasswordScreen = ({ match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                'Content-Type': 'application/json'
            },
        };

        if (password !== confirmPassword) {
            setPassword('');
            setconfirmPassword('');

            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            const { data } = await axios.put(
                `/api/auth/resetpassword/${match.params.resetToken}`,
                { password },
                config
            );
            console.log(data);
            setSuccess(data.data);

        } catch (error) {
            setError(error.response.data.error);

            setTimeout(() => {
                setError("")

            }, 5000)
        }
    };


    return (
        <div className="resetpassword-screen">
            <form className="resetpassword-screen__form" onSubmit={resetPasswordHandler}>
                <h3 className="resetpassword-screen__title">Reset Password</h3>
                {error && <span className="error-message">{error}</span>}
                {success && (
                    <span className="success-message">
                        {success}<Link to="/login">Login</Link>
                    </span>
                )}
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        placeholder="Enter new password"
                        autoComplete="true"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm New Password:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        placeholder="Confirm new password"
                        autoComplete="true"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPasswordScreen;
