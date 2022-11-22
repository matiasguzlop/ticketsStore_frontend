import React from 'react';
import { Layout, PageHeader } from 'antd';
import UsersList from '../Components/AllowedUsers/UsersList';
const { Content, Footer } = Layout;

function WhiteListPage() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
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