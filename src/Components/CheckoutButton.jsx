import React from 'react';
import { Button, Modal } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import MyContext from '../MyContext';
import { useState } from 'react';
import placeOrder from '../Services/placeOrder';
import styled from 'styled-components';
import { CheckCircleOutlined } from '@ant-design/icons';
import emptyCart from '../Services/emptyCart';

const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 4em;
    align-content: center;
    justify-content: center;
`;

const GrandTotal = styled.h1`
    font-size: 2rem;
    margin: 0;
`;

function CheckoutButton() {
    const { context, getCartImperative } = useContext(MyContext);

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleOk = () => {
        //place order!
        placeOrder(context.cart, context.userId)
            .then(result => {
                return emptyCart(context.cartId);
            })
            .then(getCartImperative);
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const grandTotal = context.grandTotal.toLocaleString("es-CL", { currency: "CLP" });
    return (
        <>
            <Container>
                <GrandTotal>Total: ${grandTotal}</GrandTotal>
                <Button
                    disabled={context.grandTotal === 0}
                    onClick={handleClick}
                    size='large'
                    icon={<ShoppingOutlined />}
                    type="primary"
                >
                    Confirmar compra
                </Button>
            </Container>
            <Modal
                title="Confirma tu orden"
                onOk={handleOk}
                onCancel={handleCancel}
                open={showModal}
                footer={
                    <>
                        <Button
                            onClick={handleCancel}
                        >Cancelar</Button>
                        <Button
                            icon={<CheckCircleOutlined />}
                            onClick={handleOk}
                            type='primary'
                        >
                            Confirmar
                        </Button>
                    </>
                }
            >
            </Modal>
        </>
    );
}

export default CheckoutButton;