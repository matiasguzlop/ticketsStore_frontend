import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../App.css';
import { Layout, Button, PageHeader } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CheckoutButton from '../Components/CheckoutButton';
import MyContext from '../MyContext';
import getCart from '../Services/getCart';
import { useEffect } from 'react';
import Badge from '../Components/Badge';

const { Content, Footer } = Layout;

const userId = "6366a2d1ee22db915130c24b";

function Root() {
    const getCartImperative = () => {
        const userId = "6366a2d1ee22db915130c24b";
        getCart(userId).then(result => {
            setContext(prev => ({
                ...prev,
                cart: result
            }));
        });
    };

    const [context, setContext] = useState(
        {
            getCartImperative: getCartImperative,
            cart: [],
            cartId: "6366a318ee22db915130c255",
            userId: userId,
            userAttributes: "admin"
        });

    useEffect(getCartImperative, []);
    const location = useLocation().pathname;
    return (
        <MyContext.Provider
            value={context}
        >
            <Layout style={{ minHeight: "100vh" }}>
                <PageHeader
                    title="Tickets Store"
                    subTitle="ANFDGAC"
                    onBack={() => window.history.back()}
                    ghost={true}
                    extra={
                        location === "/cart"
                            ? <CheckoutButton></CheckoutButton>
                            :
                            <Link to="/cart" >
                                <Badge count={context.cart.length}>
                                    <Button type='primary' icon={<ShoppingCartOutlined />}>
                                        Ver carro
                                    </Button>
                                </Badge>
                            </Link>
                    }
                >
                </PageHeader>
                <Content>
                    <Outlet></Outlet>
                </Content>
                <Footer>
                </Footer>
            </Layout>
        </MyContext.Provider>
    );
}

export default Root;