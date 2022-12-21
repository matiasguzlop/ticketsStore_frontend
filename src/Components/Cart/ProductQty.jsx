import React, { useState } from 'react';
import { Button, Space, Spin } from 'antd';
import { InputNumber } from 'antd';
import updateProductFromCart from '../../Services/updateProductFromCart';

function ProductQty({ qty, setQty, cartId, productId }) {

    const [updateStatus, setUpdateStatus] = useState({ isLoading: false, isError: false });

    const handlePreUpdateQty = (newValue) => {
        if (newValue !== qty.value) {
            setQty({ value: newValue, needFetch: true });
        } else {
            setQty({ value: newValue, needFetch: false });
        }
    };

    const handleUpdateQty = () => {
        setUpdateStatus({ isError: false, isLoading: true });
        updateProductFromCart(cartId, productId, qty.value)
            .then(() => {
                setUpdateStatus({ isError: false, isLoading: false });
                setQty({ value: qty.value, needFetch: false });
                getCartImperative();
            }).catch(() => {
                setUpdateStatus({ isError: true, isLoading: false });
            });
    };

    return (
        <Space direction='vertical'>
            <InputNumber min={1} value={qty.value} onChange={handlePreUpdateQty} />
            {qty.needFetch && <Button onClick={handleUpdateQty} size='small'>Actualizar</Button>}
            {updateStatus.isLoading && <Spin />}
        </Space>
    );
}

export default ProductQty;