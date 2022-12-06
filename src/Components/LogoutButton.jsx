import React from 'react';
import logout from '../Services/logout';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function LogoutButton() {
    const navigate = useNavigate();

    const handleCloseSession = () => {
        logout().then(() => {
            navigate('/login');
        }).catch(error => console.log(error));
    };

    return (
        <Button type='link' size='small' onClick={handleCloseSession}>Cerrar sesión</Button>
    );
}

export default LogoutButton;