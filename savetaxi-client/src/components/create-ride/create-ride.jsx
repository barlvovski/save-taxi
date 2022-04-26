import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import classes from './create-ride.module.css';
import { useAuth } from '../../auth/auth-provider';
import { fetcher } from '../../helpers/fetcher';
import { useNavigate } from 'react-router-dom';

export const CreateRide = ({ cities }) => {
    const auth = useAuth();
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    const handleCreateRide = async () => {
        if (addMinutesToDate(new Date(), -10) > date) {
            alert('נא לבחור תאריך עתידי');
            return;
        }

        if (!destination) {
            alert('אנא בחר יעד');
            return;
        }

        if (!auth.user) {
            alert('יש להתחבר לפני יצירת נסיעה');
            navigate('/login');
            return;
        }

        const result = await fetcher(`/rides/create`, 'POST', {
            date,
            destination,
            username: auth.user.username,
        });

        if (result) {
            alert('Added successfully');
            navigate('/open-rides');
        }
    };

    return (
        <div className={classes.root}>
            <div>
                <InputLabel id='destination-label'>בחר עיר יעד</InputLabel>
                <Select
                    labelId='destination'
                    id='destination'
                    value={destination}
                    label='City'
                    onChange={(e) => setDestination(e.target.value)}
                    sx={{ width: '100%' }}
                >
                    {Object.entries(cities).map(([id, name], index) => {
                        return (
                            <MenuItem key={index} value={id}>
                                {name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </div>
            <InputLabel id='destination-label'>בחר מועד נסיעה</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label='מועד נסיעה'
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                />
            </LocalizationProvider>

            <Button
                type='submit'
                variant='contained'
                onClick={handleCreateRide}
            >
                צור נסיעה
            </Button>
        </div>
    );
};

function addMinutesToDate(date, minutes) {
    return new Date(new Date(date).setMinutes(date.getMinutes() + minutes));
}
