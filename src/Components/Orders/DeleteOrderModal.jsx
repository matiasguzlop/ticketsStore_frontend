import { Modal } from 'antd';
import React from 'react';
import deleteOrder from '../../Services/deleteOrder';

function DeleteOrderModal({ id, show, setShow, onDelete }) {
    const handleDelete = async () => {
        const result = await deleteOrder(id);
        if (result.status === 200) {
            onDelete();
        }
    };

    return (
        <Modal
            title="¿Seguro que quieres eliminar esta orden?"
            onCancel={() => setShow(false)}
            onOk={handleDelete}
            open={show}
            okType="primary"
        />
    );
}

export default DeleteOrderModal;