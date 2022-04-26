import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopBar } from './components/top-bar/top-bar';
import { Login } from './components/login/login';
import { SignUp } from './components/signup/signup';
import { CreateRide } from './components/create-ride/create-ride';
import { OpenRides } from './components/open-rides/open-rides';
import { Chat } from './components/chat/chat';
import { Home } from './components/home/home';

function App() {
    const [cities, setCities] = useState({});
    useEffect(() => {
        fetch(
            'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=9999'
        )
            .then((response) => response.json())
            .then((data) => {
                const fetchedCities = data.result.records.map((city, index) => {
                    return city['שם_ישוב'];
                });
                setCities(fetchedCities);
            });
    }, []);
    return (
        <div className='App'>
            <Router>
                <TopBar />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route
                        path='/create-ride'
                        element={<CreateRide cities={cities} />}
                    />
                    <Route
                        path='/open-rides'
                        element={<OpenRides cities={cities} />}
                    />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
