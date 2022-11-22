import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../App.css';
import { Layout, PageHeader } from 'antd';
import MyContext from '../MyContext';
import getCart from '../Services/getCart';
import { useEffect } from 'react';
import GoToCartButton from '../Components/GoToCartButton';

const { Content, Footer } = Layout;

const userId = "6366a2d1ee22db915130c24b";

function Root() {
    const getCartImperative = () => {
        getCart(context.userId).then(result => {
            setContext(prev => ({
                ...prev,
                cart: result
            }));
        });
    };

    const [context, setContext] = useState(
        {
            cart: [],
            cartId: "6366a318ee22db915130c255",
            userId: userId,
            userAttributes: "admin"
        });

    useEffect(getCartImperative, []);
    const location = useLocation().pathname;
    return (
        <MyContext.Provider
            value={{ context, getCartImperative }}
        >
            <Layout style={{ minHeight: "100vh" }}>
                <PageHeader
                    title="Tickets Store"
                    subTitle="ANFDGAC"
                    onBack={() => window.history.back()}
                    ghost={true}
                    extra={
                        <GoToCartButton location={location} />
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