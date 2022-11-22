import React from 'react';
import { Layout, PageHeader, Button } from 'antd';
import { Link } from 'react-router-dom';
import Orders from '../Components/Orders/OrdersList';
const { Footer, Content } = Layout;


function AdminPage() {

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <PageHeader
                title="Órdenes de compra"
                subTitle="Administración"
                onBack={() => window.history.back()}
                ghost={true}
                extra={
                    <>
                        <Link to="/admin/whiteList">
                            <Button type='link'>Lista de usuarios permitidos</Button>
                        </Link>
                        <Link to="/admin/products">
                            <Button type='primary'>Administrar productos</Button>
                        </Link>
                    </>
                }
            >
            </PageHeader>
            <Content>
                <Orders />
            </Content>
            <Footer>

            </Footer>
        </Layout >
    );
}

export default AdminPage;