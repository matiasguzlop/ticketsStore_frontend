import React from 'react';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FetchErrorMessage from '../FetchErrorMessage';
import FetchLoadingMessage from '../FetchLoadingMessage';

const Content = styled.li`
    font-weight: bold;
`;

const title = "Producto agregado";

function AddedProductModal({ show, setShow, productToCart, fetchStatus }) {

    const handleClose = () => setShow(false);

    const footer = [
        <Button key="close" onClick={handleClose}>Continuar comprando</Button>,
        <Link key="cart" to="/cart">
            <Button type="primary">Ver Carro</Button>
        </Link>];

    if (fetchStatus.isError)
        return (
            <FetchErrorMessage
                type='modal'
                verb='agregar'
                resourceName='producto'
            >
            </FetchErrorMessage>
        );

    return (
        <Modal
            title={title}
            open={show}
            onCancel={handleClose}
            footer={footer}
        >
            <Content>{
                fetchStatus.isLoading
                    ?
                    <FetchLoadingMessage
                        resourceName={'producto'}
                        verb='agregando'
                    />
                    :
                    `${productToCart?.name} \t X ${productToCart?.qty}`
            }</Content>
        </Modal>
    );
}

export default AddedProductModal;