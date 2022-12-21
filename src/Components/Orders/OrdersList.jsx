import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getOrders from '../../Services/getOrders';
import FetchErrorMessage from '../FetchErrorMessage';
import FetchLoadingMessage from '../FetchLoadingMessage';
import SingleOrder from './SingleOrder';

const Container = styled.section`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    justify-content: center;
`;

export default function OrderList() {
    const [data, setData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState({ isError: false, isLoading: false });

    useEffect(() => {
        setFetchStatus({ isError: false, isLoading: true });
        getOrders().then(result => {
            setFetchStatus({ isError: false, isLoading: false });
            setData(result);
        }).catch(() => setFetchStatus({ isError: true, isLoading: false }));
    }, []);

    if (fetchStatus.isError) return <FetchErrorMessage resourceName='órdenes' />;
    if (fetchStatus.isLoading) return <FetchLoadingMessage resourceName='órdenes' />;
    return (
        <Container>
            {
                data.length === 0
                    ? "Aún no hay órdenes de compra."
                    : data.map(order =>
                        <SingleOrder order={order} key={order._id}></SingleOrder>
                    )}
        </Container>
    );
}

