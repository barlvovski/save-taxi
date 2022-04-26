import { useEffect, useState } from 'react';
import { fetcher } from '../../helpers/fetcher';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth-provider';

export const OpenRides = ({ cities }) => {
    const auth = useAuth();
    const [rides, setRides] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getRides = async () => {
            const rides = await fetcher('/rides/open', 'GET');
            setRides(rides);
        };

        getRides();
    }, []);

    const handleOpenChatClick = async (ride) => {
        if (!auth.user) {
            alert(`אנא התחבר בשביל לפתוח צ'אט`);
            return;
        }

        try {
            const chatRoom = await fetcher('/chats/create', 'POST', {
                id: ride._id,
                requesterId: auth.user.username,
            });
            // move to specific room
            navigate('/chat');
        } catch (err) {
            alert(err);
        }
    };

    const getRides = () => {
        console.log(rides);
        return rides.map((ride, index) => {
            return (
                <li key={index}>
                    {cities[ride.destination]} -{' '}
                    {new Date(ride.date)
                        .toISOString()
                        .slice(0, 16)
                        .replace('T', ' ')}
                    <span> - </span>
                    <span onClick={() => handleOpenChatClick(ride)}>
                        פתח צ'אט
                    </span>
                </li>
            );
        });
    };

    return (
        <div>
            <h1>נסיעות פתוחות</h1>
            <ul>{getRides()}</ul>
        </div>
    );
};
