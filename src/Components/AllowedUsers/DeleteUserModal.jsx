import React, { useState } from 'react';
import newAllowedUser from '../../Services/newAllowedUser';
import { Form, Input, Modal, Button } from 'antd';

const voidNewUser = { email: "", phone: "" };

function DeleteUserModal({ setShow, show, onNewUser }) {
    const [newUserData, setNewUserData] = useState(voidNewUser);
    const [isError, setIsError] = useState(false);

    const handleNewUserConfirmed = () => {
        newAllowedUser(newUserData).then(result => {
            setShow(false);
            setNewUserData(voidNewUser);
            onNewUser();
        }).catch(error => setIsError(true));
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

    return (
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
                </>
            }
        >
            <Form.Item
                label="Correo electrónico"
            >
                <Input
                    onChange={handleNewUserDataChange}
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
    );
}

export default DeleteUserModal;