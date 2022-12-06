import React from 'react';
import { Button } from 'antd';
import getProducts from '../../Services/getProducts';
import SingleProduct from './SingleProduct';
import { useState } from 'react';
import { useEffect } from 'react';
import NewProductModal from './NewProductModal';


function ProductList() {
    const [products, setProducts] = useState(null);
    const [isError, setIsError] = useState(false);

    const [showNewProductModal, setShowNewProductModal] = useState(false);

    const getProductsImperative = () => {
        getProducts().then(result => {
            setIsError(false);
            setProducts(result);
        }).catch(error => setIsError(true));
    };

    useEffect(getProductsImperative, []);

    const handleNewProductClick = () => {
        setShowNewProductModal(true);
    };


    if (isError) return "Error";
    if (products === null) return "Cargando...";
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