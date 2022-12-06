import { Button, Form, Input, Space, Divider, Typography } from 'antd';
import React from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import login from '../Services/login';

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

function LoginPage() {
    const navigate = useNavigate();
    const [inputCredentials, setInputCredentials] = useState({ email: null, password: null });

    const handleSubmit = () => {
        login(inputCredentials).then(result => {
            if (result.status === 200) {
                navigate('/');
            } else {
                throw result;
            }
        }).catch(error => console.log(error));
    };

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const value = event.target.value;
        setInputCredentials(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    return (
        <Container>
            <Title>Tickets store</Title>
            <StyledForm onChange={handleChange} onFinish={handleSubmit}>
                <Title level={5}>Inicia sesión</Title>
                <Form.Item label='Correo electrónico'>
                    <Input required type="text" name="email" />
                </Form.Item>
                <Form.Item label='Contraseña'>
                    <Input required type="password" name="password" />
                </Form.Item>
                <Button size='large' type='primary' htmlType='submit'>Ingresar</Button>
                <Divider />
                <Space direction='horizontal'>
                    <Link>¿Olvidaste tu contraseña?</Link>
                    <Link to='/newAccount'>Crear una cuenta</Link>
                </Space>
            </StyledForm>
        </Container>
    );
}

export default LoginPage;