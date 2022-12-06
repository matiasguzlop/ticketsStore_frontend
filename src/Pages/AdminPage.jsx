import React from 'react';
import { Layout, Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Orders from '../Components/Orders/OrdersList';
import IsLoggedChecker from '../Components/IsLoggedChecker';
import logout from '../Services/logout';
import PageHeader from '../Components/PageHeader';
import LogoutButton from '../Components/LogoutButton';
import UserEmail from '../Components/UserEmail';
import styled from 'styled-components';

const { Footer } = Layout;

const StyledA = styled.a`
    display: block;
`;

const Content = styled.main`
    margin: 2rem 10rem;
`;

function AdminPage() {
    const navigate = useNavigate();

    const handleCloseSession = () => {
        logout().then(() => {
            navigate('/login');
        }).catch(error => console.log(error));
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <IsLoggedChecker requiredAttributes="admin" />
            <PageHeader
                title="Órdenes de compra"
                subTitle="Administración"
                onBack={() => window.history.back()}
                ghost={true}
                topRight={
                    <>
                        <UserEmail isAdmin />
                        <LogoutButton />
                    </>
                }
                right={
                    <Space>
                        <Link to="/admin/whiteList">
                            <Button type='primary'>Administrar usuarios</Button>
                        </Link>
                        <Link to="/admin/products">
                            <Button type='primary'>Administrar productos</Button>
                        </Link>
                    </Space>
                }
            >
            </PageHeader>
            <Content>
                <StyledA
                    href={`${import.meta.env.VITE_API_URL}/orders/export`}
                >Descargar planilla</StyledA>
                <Orders />
            </Content>
            <Footer>

            </Footer>
        </Layout >
    );
}

export default AdminPage;