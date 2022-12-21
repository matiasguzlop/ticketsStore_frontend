import React from 'react';
import { Modal, Button } from 'antd';
import FetchLoadingMessage from './FetchLoadingMessage';
import FetchErrorMessage from './FetchErrorMessage';

function DeleteConfirmationModal({
    children,
    onConfirm,
    show,
    setShow,
    resourceName = '',
    status = { isError: false, isLoading: false },
    title = '¿Seguro quieres eliminar este elemento?'
}) {


    const handleDeleteCancelled = () => {
        setShow(false);
    };

    if (status.isError)
        return <FetchErrorMessage verb='eliminar' resourceName={resourceName} type='modal' />;
    return (
        <Modal
            title={title}
            onCancel={handleDeleteCancelled}
            open={show}
            footer={
                <>
                    <Button onClick={handleDeleteCancelled}>Cancelar</Button>
                    <Button danger type='primary' onClick={onConfirm}>Eliminar</Button>
                    {status.isLoading && <FetchLoadingMessage verb='eliminando' resourceName={resourceName} />}
                </>
            }
        >
            {children}
        </Modal>
    );
}

export default DeleteConfirmationModal;