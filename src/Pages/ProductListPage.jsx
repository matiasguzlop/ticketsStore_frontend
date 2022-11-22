import React from 'react';
import { Layout, PageHeader } from 'antd';
import ProductList from '../Components/Products/ProductList';
const { Content, Footer } = Layout;


export default function ProductListPage() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
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

