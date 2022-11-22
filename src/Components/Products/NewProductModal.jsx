import React, { useState } from 'react';
import { Form, Input, Modal, Button, Select } from 'antd';
import newProductService from '../../Services/newProduct';


const initialNewProduct = { name: undefined, price: undefined, stock: undefined, available: true };

function NewProductModal({ show, setShow, onNewProduct }) {
    //states for newProduct request
    const [newProduct, setNewProduct] = useState(initialNewProduct);

    const handleNewProductModalOk = async () => {
        const result = await newProductService(newProduct);
        if (result.status === 201) {
            setNewProduct(initialNewProduct);
            setShow(false);
            onNewProduct();
        }
    };

    const handleNewProductChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setNewProduct((prev) => {
            return ({
                ...prev,
                [fieldName]: value
            });
        });
    };

    const handleNewProductAvailableChange = (value) => {
        setNewProduct(prev => ({
            ...prev,
            available: value
        }));
    };

    return (
        <Modal
            title="Nuevo producto"
            open={show}
            onCancel={() => setShow(false)}
            // onOk={handleNewProductModalOk}
            footer={
                <Button
                    onClick={() => setShow(false)}
                >Cancelar</Button>
            }
        >
            <Form
                onFinish={handleNewProductModalOk}
                onChange={handleNewProductChange}>
                <Form.Item label="Nombre">
                    <Input
                        name="name"
                        required
                        value={newProduct.name}
                        placeholder="Ej: Agua sin gas Benedictino 2L"
                    ></Input>
                </Form.Item>
                <Form.Item label="Precio">
                    <Input
                        required
                        name="price"
                        value={newProduct.price}
                        placeholder="Ej: 2350"
                        type='number'
                    ></Input>
                </Form.Item>
                <Form.Item label="Stock">
                    <Input
                        required
                        name="stock"
                        type='number'
                        value={newProduct.stock}
                        placeholder="Ej: 250"
                    ></Input>
                </Form.Item>
                <Form.Item label="Habilitado" >
                    <Select
                        name="available"
                        options={[{
                            value: true,
                            label: "Si"
                        }, {
                            value: false,
                            label: "No"
                        }]}
                        defaultValue={true}
                        value={newProduct.available}
                        onChange={handleNewProductAvailableChange}
                    >
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary'>Crear</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default NewProductModal;