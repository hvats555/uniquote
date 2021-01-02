import React, {useRef} from 'react';
import {useAuth} from "../../../contexts/AuthContext";
import {Redirect, useHistory} from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {currentUser} = useAuth();
    const history = useHistory();

    async function handleSubmit(event){
        event.preventDefault()

        try{
            history.push('/');
            console.log(currentUser);
        } catch {
            console.log("Failed to login");
            console.log(currentUser);
        }
    }
    return (
        <div>
            {!currentUser ?
            <form onSubmit={handleSubmit}>
                Email : <input type="text" ref={emailRef}></input>
                Password: <input type="password" ref={passwordRef}></input>
                <button type="submit">Login</button>
            </form> : <Redirect to="/" />}
        </div>
    );
}

export default Login