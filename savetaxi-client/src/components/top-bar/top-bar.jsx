import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/auth-provider';
import classes from './top-bar.module.css';

export function TopBar() {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const currentTab = location.pathname;

    const handleLogout = async () => {
        navigate('/');
        await auth.signOut();
    };

    return (
        <div className={classes.root}>
            <Tabs textColor='inherit' value={currentTab}>
                <Tab label='Home' value='/' to='/' component={Link} />

                <Tab label='Chat' value='/chat' to='/chat' component={Link} />
                <Tab
                    label='Create Ride'
                    value='/create-ride'
                    to='/create-ride'
                    component={Link}
                />
                <Tab
                    label='Open Rides'
                    value='/open-rides'
                    to='/open-rides'
                    component={Link}
                />
                {auth.user ? (
                    <Tab label='Logout' value='/login' onClick={handleLogout} />
                ) : (
                    <Tab
                        label='Login'
                        value='/login'
                        to='/login'
                        component={Link}
                    />
                )}
            </Tabs>
        </div>
    );
}
