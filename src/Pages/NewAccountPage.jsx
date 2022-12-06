import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Typography, Button, Divider, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import newAccount from '../Services/newAccount';

const { Title } = Typography;

const StyledForm = styled(Form)`
    max-width: 500px;
    border: solid 1px #CCC;
    padding: 3rem;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
`;

function NewAccountPage() {
    const [formData, setFormData] = useState({});
    const [passwordsMatches, setPasswordsMatches] = useState(undefined);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (formData?.password === formData?.password2 && formData.password !== "") {
            setPasswordsMatches(true);
        } else {
            setPasswordsMatches(false);
        }
    }, [formData]);

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleSubmit = () => {
        newAccount(formData).then(result => {
            if (result.status === 201) {
                setShowModal(true);
            } else {
                console.log("Not created!");
            }
        }).catch(error => console.log(error));
    };

    return (
        <>
            <Container>
                <Title>Nueva cuenta</Title>
                <StyledForm onChange={handleChange} onFinish={handleSubmit}>
                    <Form.Item label='Correo electrónico'>
                        <Input required type='text' name='email' />
                    </Form.Item>
                    <Form.Item label='Contraseña'>
                        <Input required type="password" name="password" />
                    </Form.Item>
                    <Form.Item label='Repite la contraseña'>
                        <Input required type="password" name="password2" />
                    </Form.Item>
                    <Button
                        disabled={!passwordsMatches}
                        size='large'
                        type='primary'
                        htmlType='submit'
                    >Crear nueva cuenta</Button>
                    <Divider />
                    <Link to='/login'>Iniciar sesión</Link>
                </StyledForm>
            </Container>
            <Modal
                title='Nueva cuenta creada exitosamnte'
                open={showModal}
                onOk={() => navigate("/login")}
                onCancel={() => setShowModal(false)}
                footer={
                    <Link to='/login'>
                        <Button>Ir a iniciar sesión</Button>
                    </Link>
                }
            >
            </Modal>
        </>
    );
}

export default NewAccountPage;