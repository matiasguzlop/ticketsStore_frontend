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
    gap: 3em;
    align-content: center;
    justify-content: center;
`;

const GrandTotal = styled.div`
    font-size: 1rem;
    padding: 0.4em 2rem;
    font-weight: bold;
    /* border: 3px solid var(--border-highlight); */
    color: var(--color-highlight);
    width: max-content;
    background-color: var(--background-highlight);
    border-radius: 20px;
    label{
        text-transform: uppercase;
        font-weight: lighter;
        font-size: 0.8em
    }
`;

function CheckoutButton() {
    const { context, getCartImperative, resetGrandTotal } = useContext(MyContext);

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
            .then(getCartImperative)
            .then(resetGrandTotal);
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const grandTotal = context.grandTotal.toLocaleString("es-CL", { currency: "CLP" });
    return (
        <>
            <Container>
                <GrandTotal><label>Total:</label> ${grandTotal}</GrandTotal>
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
                {`Enviaremos una confirmación de tu pedido a ${context.userEmail}.`}
            </Modal>
        </>
    );
}

export default CheckoutButton;