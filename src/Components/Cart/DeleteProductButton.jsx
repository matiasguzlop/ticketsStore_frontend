import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import deleteProductFromCart from '../../Services/deleteProductFromCart';
import { useContext } from 'react';
import MyContext from '../../MyContext';

function DeleteProductButton({ productData, cartId, productId, setShouldRender }) {

    const { getCartImperative } = useContext(MyContext);

    const handleDelete = () => {
        Modal.confirm({
            title: "¿Eliminar producto del carro?",
            icon: <ExclamationCircleOutlined />,
            content: <strong>{productData.name}</strong>,
            okText: "Eliminar",
            okButtonProps: { danger: true },
            cancelText: "Cancelar",
            onOk: handleDeleteConfirmed
        });
    };

    const handleDeleteConfirmed = () => {
        deleteProductFromCart(cartId, productId)
            .then(getCartImperative);//TODO: show loading status and catch showing error msg
        setShouldRender(false);
    };

    return (
        <Button
            key="delete"
            danger={true}
            type="primary"
            onClick={handleDelete}
        ><DeleteOutlined /></Button>
    );
}

export default DeleteProductButton;