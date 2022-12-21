import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import getUserById from '../../Services/getUserById';
import ProductInOrderDetails from './ProductInOrderDetails';
import OrderStatus from './OrderStatus';
import OrderTotal from './OrderTotal';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import deleteOrder from '../../Services/deleteOrder';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import FetchErrorMessage from '../../Components/FetchErrorMessage';
import FetchLoadingMessage from '../../Components/FetchLoadingMessage';

function SingleOrder({ order }) {
    const [shouldRender, setShouldRender] = useState(true);

    const [userData, setUserData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState({ isError: false, isLoading: false });

    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
    const [deleteFetchStatus, setDeleteFetchStatus] = useState({ isError: false, isLoading: false });

    useEffect(() => {
        setFetchStatus({ isError: false, isLoading: true });
        getUserById(order.userId).then(result => {
            setFetchStatus({ isError: false, isLoading: false });
            setUserData(result);
        }).catch(() => setFetchStatus({ isError: true, isLoading: false }));
    }, []);

    const handleDeleteConfirmed = () => {
        setDeleteFetchStatus({ isError: false, isLoading: true });
        deleteOrder(order._id)
            .then(() => {
                setShouldRender(false);
                setDeleteFetchStatus({ isError: false, isLoading: false });
            })
            .catch(() => setDeleteFetchStatus({ isError: true, isLoading: false }));
    };

    if (fetchStatus.isLoading) return <FetchLoadingMessage resourceName='orden' />;
    if (fetchStatus.isError) return <FetchErrorMessage resourceName='orden' />;
    if (shouldRender === false) return;
    return (
        <>
            <Card
                style={{ margin: "1rem" }}
                title={fetchStatus.isLoading ? <Spin /> : userData.email}
                extra={
                    <>
                        <Button
                            onClick={() => setShowDeleteConfirmationModal(true)}
                            danger
                            type='primary'
                        >
                            <DeleteOutlined />
                        </Button>
                        <OrderStatus initialStatus={order.status} id={order._id} />
                    </>
                }
            >
                <div>
                    <ul>
                        {
                            order.products.length === 0
                                ? "No hay productos en esta orden."
                                : order.products.map(prod =>
                                    <ProductInOrderDetails key={prod._id} qty={prod.qty} id={prod.productId} />
                                )
                        }
                    </ul>
                    <OrderTotal>{order.total}</OrderTotal>
                </div>
            </Card>
            <DeleteConfirmationModal
                show={showDeleteConfirmationModal}
                setShow={setShowDeleteConfirmationModal}
                onConfirm={handleDeleteConfirmed}
                status={deleteFetchStatus}
                resourceName='orden'
            ></DeleteConfirmationModal>
        </>
    );
}

export default SingleOrder;