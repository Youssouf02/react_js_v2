import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import UserInfo from './pages/UserInfo';


    function AppRouter() {
    return(
        <Router>
        
            <Routes>
                <Route path='/' element={<UserInfo/>}/>
            </Routes>
        </Router>
    )
    }   

    export default AppRouter;