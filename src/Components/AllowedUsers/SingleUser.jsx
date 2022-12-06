import { Card, Descriptions, Modal } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import deleteAllowedUser from '../../Services/deleteAllowedUser';

const Container = styled.article`
    margin-top: 1rem;
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
        <Card
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
            <Modal
                title='¿Seguro que quieres eliminar el usuario?'
                onCancel={handleDeleteCancelled}
                open={showDeleteConfirmationModal}
                onOk={handleDeleteConfirmed}
            >
                <UserDescription />
            </Modal>
        </Container>
    );
}

export default SingleUser;