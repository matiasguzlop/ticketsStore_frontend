import React from 'react';
import { Layout, PageHeader } from 'antd';
import UsersList from '../Components/AllowedUsers/UsersList';
const { Footer } = Layout;
import IsLoggedChecker from '../Components/IsLoggedChecker';
import styled from 'styled-components';

const Content = styled.main`
    margin: 2rem 10rem;
`;

function WhiteListPage() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <IsLoggedChecker requiredAttributes="admin" />
            <PageHeader
                title="Lista de usuarios permitidos"
                subTitle="Administración"
                onBack={() => window.history.back()}
                ghost={true}
            >
            </PageHeader>
            <Content>
                <UsersList></UsersList>
            </Content>
            <Footer>

            </Footer>
        </Layout>
    );
}

export default WhiteListPage;