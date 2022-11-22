import { Button, Modal, Form, Input, Select } from 'antd';
import React from 'react';
import { useState } from 'react';
import editProduct from '../../Services/editProduct';

function EditModal({ product, setProduct, show, setShow }) {
    const [newData, setNewData] = useState(product);

    const handleEditOk = async () => {
        const result = await editProduct(product._id, newData);
        if (result.status === 200) {
            setShow(false);
            setProduct(newData);
        }
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        const fieldName = e.target.name;
        setNewData((prev) => ({
            ...prev,
            [fieldName]: newValue
        }));
    };

    const handleAvailableChange = (value) => {
        setNewData((prev) => ({
            ...prev,
            available: value
        }));
    };

    return (
        <>
            <Modal
                title="Editar"
                open={show}
                onCancel={() => setShow(false)}
                footer={<Button onClick={() => setShow(false)}>Cancelar</Button>}
            >
                <Form
                    onFinish={handleEditOk}
                    onChange={handleChange}>
                    <Form.Item label="Nombre">
                        <Input
                            name="name"
                            required
                            value={newData.name}
                            placeholder="Ej: Agua sin gas Benedictino 2L"
                        ></Input>
                    </Form.Item>
                    <Form.Item label="Precio">
                        <Input
                            required
                            name="price"
                            value={newData.price}
                            placeholder="Ej: 2350"
                        ></Input>
                    </Form.Item>
                    <Form.Item label="Stock">
                        <Input
                            required
                            name="stock"
                            value={newData.stock}
                            placeholder="Ej: 250"
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        label="Habilitado"
                    >
                        <Select
                            name="available"
                            options={[{
                                value: true,
                                label: "Si"
                            }, {
                                value: false,
                                label: "No"
                            }]}
                            value={newData.available}
                            onChange={handleAvailableChange}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary'>Editar</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EditModal;