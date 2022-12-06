import React from 'react';
import { Layout, PageHeader } from 'antd';
import ProductList from '../Components/Products/ProductList';
const { Footer } = Layout;
import IsLoggedChecker from '../Components/IsLoggedChecker';
import styled from 'styled-components';

const Content = styled.main`
    margin: 2rem 10rem;
`;

export default function ProductListPage() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <IsLoggedChecker requiredAttributes="admin" />
            <PageHeader
                title="Productos"
                subTitle="Administración"
                onBack={() => window.history.back()}
                ghost={true}
            >
            </PageHeader>
            <Content>
                <ProductList></ProductList>
            </Content>
            <Footer>

            </Footer>
        </Layout>
    );
}

