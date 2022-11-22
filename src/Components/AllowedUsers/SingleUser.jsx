import { Descriptions, Modal } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import deleteAllowedUser from '../../Services/deleteAllowedUser';

const Container = styled.div`
    border: 1px solid #AAAA;
    margin: 1rem;
    padding: 1rem;
`;

function SingleUser({ user }) {
    const [shouldRender, setShouldRender] = useState(true);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    const handleDelete = (e) => {
        setShowDeleteConfirmationModal(true);
    };

    const handleDeleteConfirmed = async () => {
        const result = await deleteAllowedUser(user._id);
        setShowDeleteConfirmationModal(false);
        if (result?.status === 200) {
            setShouldRender(false);
        }
    };

    const handleDeleteCancelled = () => {
        setShowDeleteConfirmationModal(false);
    };

    if (shouldRender === false) return;

    const UserDescription = ({ withDelete }) =>
        <Descriptions
            layout='vertical'
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
            <Descriptions.Item label="Correo electrónico">
                {user.email}
            </Descriptions.Item>
            <Descriptions.Item label="Teléfono">
                {user.phone}
            </Descriptions.Item>
        </Descriptions>;

    return (
        <>
            <Container>
                <UserDescription withDelete={true} />
            </Container>
            <Modal
                title="¿Seguro que quieres eliminar este usuario?"
                onCancel={handleDeleteCancelled}
                open={showDeleteConfirmationModal}
                onOk={handleDeleteConfirmed}
            >
                <UserDescription />
            </Modal>
        </>
    );
}

export default SingleUser;