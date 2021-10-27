import React, { useState } from 'react';
import axios from 'axios';


const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post(
                '/api/auth/forgotpassword',
                { email },
                config
            );
            setSuccess(data.data);

        } catch (error) {
            setError(error.response.data.error);
            setEmail("");

            setTimeout(() => {
                setError("")

            }, 5000)

        }
    };


    return (
        <div className="forgotpassword-screen">
            <form className="forgotpassword-screen__form" onSubmit={forgotPasswordHandler}>
                <h3 className="forgotpassword-screen__title">Forgot Password</h3>
                {error && <span className="error-message">{error}</span>}
                {success && <span className="success-message">{success}</span>}
                <div className="form-group">
                    <p className="forgotpasswors-screen__subtext">
                        PLEASE ENTER THE REGISTERED EMAIL, WE WILL SEND YOU RESET PASSWORD CONFIRMATION TO THIS EMAIL
                    </p>
                    <label htmlFor="email"> Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Send Email</button>
            </form>
        </div>
    )
}

export default ForgotPasswordScreen;
