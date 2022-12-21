import React from 'react';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import getWhiteList from '../../Services/getWhiteList';
import SingleUser from './SingleUser';
import NewUserModal from './NewUserModal';
import FetchErrorMessage from '../../Components/FetchErrorMessage';
import FetchLoadingMessage from '../../Components/FetchLoadingMessage';

const Container = styled.div`
    
`;

function UsersList() {
    const [showNewUserModal, setShowNewUserModal] = useState(false);

    const [users, setUsers] = useState([]);
    const [usersFetchStatus, setUsersFetchStatus] = useState({ isError: false, isLoading: false });

    const getWhiteListImperative = () => {
        //get allowed users list
        setUsersFetchStatus({ isError: false, isLoading: true });
        getWhiteList().then(result => {
            setUsersFetchStatus({ isError: false, isLoading: false });
            setUsers(result);
        }).catch(() => setUsersFetchStatus({ isError: true, isLoading: false }));
    };

    //gets allowed users list for first time
    useEffect(getWhiteListImperative, []);

    if (setUsersFetchStatus.isError) return <FetchErrorMessage resourceName='usuarios' />;
    if (setUsersFetchStatus.isLoading) return <FetchLoadingMessage resourceName='usuarios' />;

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
            <NewUserModal
                show={showNewUserModal}
                setShow={setShowNewUserModal}
                onNewUser={getWhiteListImperative}
            />
        </>
    );
}

export default UsersList;