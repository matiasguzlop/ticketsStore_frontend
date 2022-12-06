import React from 'react';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import getWhiteList from '../../Services/getWhiteList';
import SingleUser from './SingleUser';
import DeleteUserModal from './DeleteUserModal';

const Container = styled.div`
    
    
`;

function UsersList() {
    const [showNewUserModal, setShowNewUserModal] = useState(false);

    //state for allowed users list
    const [isError, setIsError] = useState(false);
    const [users, setUsers] = useState(null);

    const getWhiteListImperative = () => {
        //get allowed users list
        getWhiteList().then(result => {
            setIsError(false);
            setUsers(result);
        }).catch(error => setIsError(true));
    };

    //gets allowed users list for first time
    useEffect(getWhiteListImperative, []);

    if (isError) return "Error";
    if (users === null) return "Cargando...";

    const handleNewUserClick = () => {
        setShowNewUserModal(true);
    };

    return (
        <>
            <Button
                type='link'
                onClick={handleNewUserClick}
            >Agregar usuario</Button>
            <Container>
                {users.length === 0
                    ? "Aún no hay usuarios registrados"
                    : users.map(user =>
                        <SingleUser key={user._id} user={user}></SingleUser>
                    )}
            </Container>
            <DeleteUserModal
                show={showNewUserModal}
                setShow={setShowNewUserModal}
                onNewUser={getWhiteListImperative}
            />
        </>
    );
}

export default UsersList;