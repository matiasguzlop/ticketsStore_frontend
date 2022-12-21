import React from 'react';
import { Layout, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import OrderList from '../Components/Orders/OrdersList';
import IsLoggedChecker from '../Components/IsLoggedChecker';
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
                <OrderList />
            </Content>
            <Footer>

            </Footer>
        </Layout >
    );
}

export default AdminPage;