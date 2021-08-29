import React,{useState, useEffect} from 'react';
import cookie from 'react-cookies';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import {useHistory} from 'react-router-dom';
const API_SERVER = 'https://eraser-401.herokuapp.com';
export const AuthContext = React.createContext();

function AuthProvider (props) {
    const history = useHistory()
    const [user, setUser] = useState({
        loggedIn: false,
        user: {},
        login, 
        logout,
        signup
    })

    async function login (username, password)  {
        const encoded = base64.encode(`${username}:${password}`);
        const result = await fetch(`${API_SERVER}/signin`, {
            method: 'post',
            headers: {Authorization: `Basic ${encoded}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-origin": '*',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Range"
            },
            mode: 'cors',
        });
        let data = await result.json();
        validateToken(data.token);
    }

    async function signup (userData)  {
        const obj = {
            ...userData
        }
        const result = await fetch(`${API_SERVER}/signup`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-origin': API_SERVER
            },
            body: JSON.stringify(obj)
        });

        let data = await result.json();
        if(data) validateToken(data.token)
        history.push('/')
    }

    function validateToken  (token)  {
        const user = jwt.decode(token);
        if (user) {
            setAuthState(true, user, token);
        }
    }

    function setAuthState  (loggedIn, user2, token)  {
        let obj = user2
        setUser(prev =>{return{...prev,loggedIn, user:{...obj}}});
        cookie.save('auth-token', token);
        cookie.save('userName', user2.firstName);
        
    }

    function logout  ()  {
        setAuthState(false, {}, null);
    }

    useEffect (() => {
        const token = cookie.load('auth-token');
        validateToken(token);
    }, [])

    
        return (
            <AuthContext.Provider value={user}>
                {props.children}
            </AuthContext.Provider>
        )
    
}

export default AuthProvider;