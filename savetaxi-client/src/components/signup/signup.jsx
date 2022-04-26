import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import classes from './signup.module.css';
import Button from '@mui/material/Button';
import { fetcher } from '../../helpers/fetcher';
import * as React from 'react';

export const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        navigate('/login');
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!username || !password || !fullName || !phone) {
            alert('אנא מלא את כל השדות');
            return;
        }

        // regex to check if phone is 10 digits
        if (!phone.match(/^\d{10}$/)) {
            alert('מספר טלפון אינו תקין');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('כתובת אימייל אינה תקינה');
            return;
        }

        const result = await fetcher(`/auth/signup`, 'POST', {
            username,
            password,
            email,
            phone,
            fullName,
        });
        if (result.status !== 500) {
            alert('Added successfully');
        } else {
            alert('Error: ' + result.message);
        }
    };

    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <div className={classes.title}>SIGN UP</div>
                <TextField
                    label='Username'
                    InputProps={{
                        name: 'username',
                        id: 'username',
                        value: username,
                        autoComplete: 'on',
                        onChange: (e) => setUsername(e.target.value),
                        required: true,
                    }}
                />
                <br />
                <TextField
                    label='Password'
                    InputProps={{
                        name: 'password',
                        id: 'password',
                        type: 'password',
                        value: password,
                        autoComplete: 'on',
                        onChange: (e) => setPassword(e.target.value),
                    }}
                />
                <br />
                <TextField
                    label='Email'
                    InputProps={{
                        name: 'email',
                        id: 'email',
                        value: email,
                        autoComplete: 'on',
                        onChange: (e) => setEmail(e.target.value),
                    }}
                />
                <br />

                <TextField
                    label='Full Name'
                    InputProps={{
                        name: 'fullName',
                        id: 'fullName',
                        value: fullName,
                        autoComplete: 'on',
                        onChange: (e) => setFullName(e.target.value),
                    }}
                />
                <br />
                <TextField
                    label='Phone'
                    InputProps={{
                        name: 'phone',
                        id: 'phone',
                        value: phone,
                        autoComplete: 'on',
                        onChange: (e) => setPhone(e.target.value),
                    }}
                />
                <br />
                <Button
                    className={classes.button}
                    type='submit'
                    variant='contained'
                    onClick={handleCreate}
                >
                    Sign Up
                </Button>
                <br />
                <div>
                    <div className={classes.text}>
                        Do you already have an account?
                    </div>
                    <Button
                        className={classes.button}
                        type='submit'
                        variant='contained'
                        onClick={loginSubmit}
                    >
                        Login
                    </Button>
                </div>
                <br />
            </form>
        </div>
    );
};
