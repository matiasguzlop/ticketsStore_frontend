import { Button, Descriptions, InputNumber, Modal, Space, Spin } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import getProduct from '../Services/getProduct';
import updateProductFromCart from '../Services/updateProductFromCart';
import { useContext } from 'react';
import MyContext from '../MyContext';
import deleteProductFromCart from '../Services/deleteProductFromCart';
import { useEffect } from 'react';

function CartProduct({ productId, qty: initialQty }) {
    const [shouldRender, setShouldRender] = useState(true);
    const { cartId } = useContext(MyContext);

    const [productData, setProductData] = useState(null);
    const [isError, setIsError] = useState(false);

    const [qty, setQty] = useState({ value: initialQty, needFetch: false });
    const [updateStatus, setUpdateStatus] = useState({ isLoading: false, isError: false, data: null });


    const getProductDataImperative = () => {
        getProduct(productId).then(result => {
            setIsError(false);
            setProductData(result);
        }).catch(error => setIsError(true));
    };

    useEffect(getProductDataImperative, []);

    if (isError) return "Error";
    if (productData === null) return "Cargando...";
    if (shouldRender === false) return;

    //delete handlers
    const handleDelete = () => {
        Modal.confirm({
            title: "¿Eliminar producto del carro?",
            icon: <ExclamationCircleOutlined />,
            content: productData.name,
            okText: "Eliminar",
            okButtonProps: { danger: true },
            cancelText: "Cancelar",
            onOk: handleDeleteConfirmed
        });
    };
    const handleDeleteConfirmed = () => {
        deleteProductFromCart(cartId, productId);
        setShouldRender(false);
    };

    //update handlers
    const handlePreUpdateQty = (newValue) => {
        if (newValue !== qty.value) {
            setQty({ value: newValue, needFetch: true });
        } else {
            setQty({ value: newValue, needFetch: false });
        }
    };
    const handleUpdateQty = () => {
        updateProductFromCart(cartId, productId, qty.value, setUpdateStatus);
        if (updateStatus !== "error" && updateStatus !== "loading") {
            setQty({ value: qty.value, needFetch: false });
        }
    };

    const unitPriceFormatted = "$" + parseInt(productData.price).toLocaleString("es-CL", { currency: "CLP" });
    const totalPriceFormatted = "$" + (parseInt(productData.price) * parseInt(qty.value)).toLocaleString("es-CL", { currency: "CLP" });
    return (
        <>
            <Descriptions
                title={productData.name}
                bordered={true}
                extra={
                    <Space>
                        {(updateStatus.isLoading || updateStatus.isError) && <Spin key="spin"></Spin>}
                        <Button
                            key="delete"
                            danger={true}
                            type="primary"
                            onClick={handleDelete}
                        ><DeleteOutlined /></Button>
                    </Space>
                }
            >
                <Descriptions.Item
                    label="Precio unitario"
                >
                    {unitPriceFormatted}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Cantidad"
                >
                    <Space direction='vertical'>
                        <InputNumber min={1} value={qty.value} onChange={handlePreUpdateQty} />
                        {qty.needFetch && <Button onClick={handleUpdateQty} size='small'>Actualizar</Button>}
                    </Space>
                </Descriptions.Item>
                <Descriptions.Item
                    label="Precio total"
                >
                    {totalPriceFormatted}
                </Descriptions.Item>
            </Descriptions>
        </>
    );

}

export default CartProduct;