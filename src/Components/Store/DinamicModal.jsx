import React from 'react';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';


function DinamicModal({ type, show, setShow, children, successTitle }) {
    const handleClose = () => setShow(false);
    let title = "default";
    let footer = <Button key="close" onClick={handleClose}> Ok </ Button >;
    let content;
    if (type === "loading") {
        title = "Procesando...";
        content = "";
    }
    if (type === "error") {
        title = "Error";
        content = "Intenta nuevamente, si el problema persiste contacta al administrador.";
    }
    if (type === "success") {
        title = successTitle;
        footer = [<Button key="close" onClick={handleClose}>Continuar comprando</Button>,
        <Link key="cart" to="/cart"><Button type="primary">Ver Carro</Button></Link>];
        content = children;
    }
    return (
        <Modal
            title={title}
            open={show}
            // actionFunction={() => { }}
            onCancel={handleClose}
            footer={footer}
        >
            {content}
        </Modal>
    );
}

export default DinamicModal;