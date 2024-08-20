import React from 'react';
import { Route, Routes } from 'react-router-dom';
import User from './components/User';
import AddUpdateUserForm from './components/AddUpdateUserForm';

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<User />} />
                <Route path='/user-form' element={<AddUpdateUserForm />} />
                <Route path='/user-form/:id' element={<AddUpdateUserForm />} />
            </Routes>
        </div>
    );
}

export default MainRoutes;