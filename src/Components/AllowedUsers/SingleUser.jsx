import { Card, Descriptions, Modal } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import deleteAllowedUser from '../../Services/deleteAllowedUser';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const Container = styled.article`
    margin-top: 1rem;
`;

function SingleUser({ user }) {
    const [shouldRender, setShouldRender] = useState(true);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    const [deleteFetchStatus, setDeleteFetchStatus] = useState({ isError: false, isLoading: false });

    const handleDelete = () => {
        setShowDeleteConfirmationModal(true);
    };

    const handleDeleteConfirmed = () => {
        setDeleteFetchStatus({ isError: false, isLoading: true });
        deleteAllowedUser(user._id)
            .then(() => {
                setDeleteFetchStatus({ isError: false, isLoading: false });
                setShouldRender(false);
                setShowDeleteConfirmationModal(false);
            })
            .catch(() => setDeleteFetchStatus({ isError: true, isLoading: false }));
    };


    if (shouldRender === false) return;

    const UserDescription = ({ withDelete }) =>
        <Card
            bordered={false}
            title={user.email}
            extra={
                withDelete &&
                <Button
                    danger
                    type='primary'
                    onClick={handleDelete}
                >
                    <DeleteOutlined />
                </Button>
            }
        >
            <Descriptions>
                <Descriptions.Item label="Teléfono">
                    {user.phone}
                </Descriptions.Item>
            </Descriptions>
        </Card>;

    return (
        <Container>
            <UserDescription withDelete={true} />
            <DeleteConfirmationModal
                title='¿Seguro que quieres eliminar el usuario?'
                show={showDeleteConfirmationModal}
                setShow={setShowDeleteConfirmationModal}
                onConfirm={handleDeleteConfirmed}
                status={deleteFetchStatus}
            >
                <UserDescription withDelete={false} />
            </DeleteConfirmationModal>
        </Container>
    );
}

export default SingleUser;