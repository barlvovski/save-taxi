import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { BasicModal } from '../modal/modal';
import { useAuth } from '../../auth/auth-provider';
import Typography from '@mui/material/Typography';
import classes from './login.module.css';
import Button from '@mui/material/Button';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const [modal, setModal] = useState({ header: 'Alert', content: <></> });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const signUpSubmit = async (e) => {
        navigate('/signup');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                const userId = await auth.signIn({ username, password });
                console.log(userId);
                navigate('/');
            } catch (e) {
                setModal({
                    header: 'Error',
                    content: (
                        <>
                            <Typography sx={{ mt: 2 }}>
                                Error while trying to login:
                                <br />
                                {e.message}
                            </Typography>
                            <Button
                                sx={{ mt: 2 }}
                                variant='contained'
                                onClick={() => setOpen(false)}
                            >
                                OK
                            </Button>
                        </>
                    ),
                });
                setOpen(true);
            }
        } else {
            setModal({
                header: 'Missing inputs',
                content: (
                    <>
                        <Typography sx={{ mt: 2 }}>
                            Missing username or password
                        </Typography>
                        <Button
                            sx={{ mt: 2 }}
                            variant='contained'
                            onClick={() => setOpen(false)}
                        >
                            OK
                        </Button>
                    </>
                ),
            });
            setOpen(true);
        }
    };

    return (
        <div className={classes.root}>
            <form className={classes.form}>
                <div className={classes.title}>LOGIN</div>
                <TextField
                    label='Username'
                    InputProps={{
                        name: 'username',
                        id: 'username',
                        value: username,
                        autoComplete: 'on',
                        onChange: (e) => setUsername(e.target.value),
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
                <Button
                    className={classes.button}
                    type='submit'
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Login
                </Button>
                <br />
                <div>
                    <div className={classes.text}>Don't have an account?</div>
                    <Button
                        className={classes.button}
                        type='submit'
                        variant='contained'
                        onClick={signUpSubmit}
                    >
                        Sign up
                    </Button>
                </div>
                <br />
            </form>
            {open && (
                <BasicModal
                    header={modal.header}
                    content={modal.content}
                    setOpen={setOpen}
                />
            )}
        </div>
    );
};
