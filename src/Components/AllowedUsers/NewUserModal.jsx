import React, { useState } from 'react';
import newAllowedUser from '../../Services/newAllowedUser';
import { Form, Input, Modal, Button } from 'antd';
import FetchErrorMessage from '../FetchErrorMessage';
import FetchLoadingMessage from '../FetchLoadingMessage';

const voidNewUser = { email: "", phone: "" };

function NewUserModal({ setShow, show, onNewUser }) {
    const [newUserData, setNewUserData] = useState(voidNewUser);
    const [newUserFetchStatus, setNewUserFetchStatus] = useState({ isError: false, isLoading: false });

    const handleNewUserConfirmed = () => {
        setNewUserFetchStatus({ isError: false, isLoading: true });
        newAllowedUser(newUserData).then(() => {
            setShow(false);
            setNewUserData(voidNewUser);
            setNewUserFetchStatus({ isError: false, isLoading: false });
            onNewUser();
        }).catch(() => setNewUserFetchStatus({ isError: true, isLoading: false }));
    };

    const handleNewUserDataChange = (event) => {
        const target = event.target;
        setNewUserData(prev => {
            return ({
                ...prev,
                [target.name]: target.value
            });
        });
    };

    if (newUserFetchStatus.isError) {
        return (
            <FetchErrorMessage
                resourceName='nuevo usuario'
                verb='agregando'
                type='modal'
            />
        );
    }
    return (
        <>
            <Modal
                open={show}
                onCancel={() => setShow(false)}
                title="Nuevo usuario"
                footer={
                    <>
                        <Button onClick={() => setShow(false)}>
                            Cancelar
                        </Button>
                        <Button
                            type='primary'
                            onClick={handleNewUserConfirmed}>
                            Añadir
                        </Button>
                        {newUserFetchStatus.isLoading && <FetchLoadingMessage verb='agregando' resourceName='nuevo usuario' />}
                    </>
                }
            >
                <Form.Item
                    label="Correo electrónico"
                >
                    <Input
                        onChange={handleNewUserDataChange}
                        required
                        type='email'
                        name="email"
                        value={newUserData.email}
                    ></Input>
                </Form.Item>

                <Form.Item
                    label="Teléfono móvil"
                >
                    <Input
                        onChange={handleNewUserDataChange}
                        name="phone"
                        type='phone'
                        prefix="+569"
                        value={newUserData.phone}
                    ></Input>
                </Form.Item>
            </Modal>
        </>

    );
}

export default NewUserModal;