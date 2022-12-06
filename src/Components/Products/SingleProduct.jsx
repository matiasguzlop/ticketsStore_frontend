import { Card, Descriptions, Modal } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import deleteProduct from '../../Services/deleteProduct';
import EditModal from './EditModal';

const Container = styled.div`
    margin-top: 1rem;
`;

function SingleProduct({ product }) {
    const [data, setData] = useState(product);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    const priceFormatted = parseInt(data.price).toLocaleString("es-CL", { currency: "CLP" });

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = async () => {
        const result = await deleteProduct(data._id);
        if (result.status === 200) {
            setShowDeleteModal(false);
            setShouldRender(false);
        }
    };

    const handleEdit = async () => {
        setShowEditModal(true);
    };

    const ProductDescription = ({ withControls }) => {
        return (
            <Card
                title={data.name}
                extra={
                    withControls &&
                    <>
                        <Button
                            danger
                            type='primary'
                            onClick={handleDelete}
                            icon={<DeleteOutlined></DeleteOutlined>}
                        ></Button>
                        <Button
                            type='primary'
                            onClick={handleEdit}
                            icon={<EditOutlined />}
                        />
                    </>
                }
            >
                <Descriptions>
                    <Descriptions.Item label="Precio">{priceFormatted}</Descriptions.Item>
                    <Descriptions.Item label="Stock">{data.stock}</Descriptions.Item>
                    <Descriptions.Item label="Habilitado">{data.available ? "Si" : "No"}</Descriptions.Item>
                </Descriptions>
            </Card>
        );
    };
    if (shouldRender === false) return;
    return (
        <>
            <Container>
                <ProductDescription withControls={true}></ProductDescription>
            </Container>
            <Modal
                title="¿Seguro que quieres eliminar este producto?"
                onCancel={() => setShowDeleteModal(false)}
                onOk={handleDeleteConfirmed}
                open={showDeleteModal}
            >
                <ProductDescription withControls={false}></ProductDescription>
            </Modal>
            <EditModal product={data} setProduct={setData} show={showEditModal} setShow={setShowEditModal}></EditModal>
        </>
    );
}

export default SingleProduct;