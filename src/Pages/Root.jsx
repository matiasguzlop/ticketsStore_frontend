import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../App.css';
import { Layout } from 'antd';
import PageHeader from '../Components/PageHeader';
import MyContext from '../MyContext';
import getCart from '../Services/getCart';
import GoToCartButton from '../Components/GoToCartButton';
import getProduct from '../Services/getProduct';
import IsLoggedChecker from '../Components/IsLoggedChecker';
import LogoutButton from '../Components/LogoutButton';
import UserEmail from '../Components/UserEmail';

const { Content, Footer } = Layout;

function Root() {
    const getCartImperative = () => {
        if (context.userId) {
            getCart(context.userId).then(result => {
                setContext(prev => ({
                    ...prev,
                    cart: result
                }));
            });
        }
    };

    const resetGrandTotal = () => {
        setContext(prev => ({
            ...prev,
            grandTotal: 0
        }));
    };

    const [context, setContext] = useState(
        {
            cart: [],
            cartId: undefined,
            userId: undefined,
            userAttributes: undefined,
            userEmail: undefined,
            grandTotal: 0,
        });

    useEffect(getCartImperative, [context.userId]);

    useEffect(() => {
        //calculate grand total when cart is changed
        if (context.cart.length !== 0) {
            const productsDataPromises = context.cart.map(item => getProduct(item.productId));
            Promise.all(productsDataPromises).then(values => {
                const grandTotal = values.reduce((prev, curr, index) => prev + parseInt(curr.price) * context.cart[index].qty, 0);
                setContext(prevState => ({
                    ...prevState,
                    grandTotal,
                }));
            });
        }
    }, [context.cart]);

    const location = useLocation().pathname;
    const title = location === "/cart" ? "Carro de compras" : "Tickets Store";
    return (
        <MyContext.Provider
            value={{ context, getCartImperative, resetGrandTotal, setContext }}
        >
            <IsLoggedChecker requiredAttributes="user" />
            <Layout style={{ minHeight: "100vh" }}>
                <PageHeader
                    title={title}
                    subTitle="ANFDGAC"
                    onBack={() => window.history.back()}
                    topRight={
                        <>
                            <UserEmail />
                            <LogoutButton />
                        </>
                    }
                    right={
                        <>
                            <GoToCartButton location={location} />
                        </>
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