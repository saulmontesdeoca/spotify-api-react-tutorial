import React from 'react';

const LoginButtonForm = (props) => {
    return (
            <div className='login'>
                <h1>Login with Spotify</h1>
                <button onClick={() => props.handleLogin()}>Login</button>
            </div>
    );
};

export default LoginButtonForm;