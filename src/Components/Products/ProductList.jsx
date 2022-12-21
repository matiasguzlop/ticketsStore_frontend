import React from 'react';
import { Button } from 'antd';
import getProducts from '../../Services/getProducts';
import SingleProduct from './SingleProduct';
import { useState } from 'react';
import { useEffect } from 'react';
import NewProductModal from './NewProductModal';
import FetchErrorMessage from '../../Components/FetchErrorMessage';
import FetchLoadingMessage from '../../Components/FetchLoadingMessage';


function ProductList() {
    const [products, setProducts] = useState([]);
    const [productFetchStatus, setProductFetchStatus] = useState({ isError: false, isLoading: false });

    const [showNewProductModal, setShowNewProductModal] = useState(false);

    const getProductsImperative = () => {
        setProductFetchStatus({ isError: false, isLoading: true });
        getProducts().then(result => {
            setProductFetchStatus({ isError: false, isLoading: false });
            setProducts(result.data.message);
        }).catch(error => setProductFetchStatus({ isError: true, isLoading: false }));
    };

    useEffect(getProductsImperative, []);

    const handleNewProductClick = () => {
        setShowNewProductModal(true);
    };


    if (productFetchStatus.isError) return <FetchErrorMessage resourceName='productos' />;
    if (productFetchStatus.isLoading) return <FetchLoadingMessage resourceName='productos' />;
    return (
        <>
            <Button
                onClick={handleNewProductClick}
                type='link'
            >Nuevo producto...</Button>
            {products.length === 0
                ? "No existen productos en la tienda."
                : products.map(product =>
                    <SingleProduct key={product._id} product={product}></SingleProduct>
                )
            }
            <NewProductModal
                show={showNewProductModal}
                setShow={setShowNewProductModal}
                onNewProduct={getProductsImperative}
            />
        </>
    );
}

export default ProductList;