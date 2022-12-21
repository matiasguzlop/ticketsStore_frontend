import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/Store/ProductCard';
import getProducts from '../Services/getProducts';
import addToCart from '../Services/addToCart';
import ProductsContainer from '../Components/Store/ProductsContainer';
import { useContext } from 'react';
import MyContext from '../MyContext';
import FetchErrorMessage from '../Components/FetchErrorMessage';
import FetchLoadingMessage from '../Components/FetchLoadingMessage';
import AddedProductModal from '../Components/Store/AddedProductModal';


export default function StorePage() {
    const { getCartImperative } = useContext(MyContext);

    // states for fetching products
    const [products, setProducts] = useState(null);
    const [productsFetchState, setProductsFetchState] = useState({ isError: false, isLoading: true });

    // status for adding to cart request
    const [productToCart, setProductToCart] = useState(null);
    const [addStatus, setAddStatus] = useState({ isError: false, isLoading: false });

    const [showAddedProductModal, setShowAddedProductModal] = useState(false);

    useEffect(() => {
        //get all products in store
        setProductsFetchState({ isError: false, isLoading: true });
        getProducts()
            .then(result => {
                setProductsFetchState({ isError: false, isLoading: false });
                setProducts(result.data.message);
            }).catch(() =>
                setProductsFetchState({ isError: true, isLoading: false })
            );
    }, []);

    useEffect(() => {
        //update cart through api when productToCart changes.
        if (productToCart !== null) {
            setAddStatus({ isError: false, isLoading: true });
            setShowAddedProductModal(true);
            addToCart(productToCart)
                .then(() => {
                    setAddStatus({ isError: false, isLoading: false });
                    getCartImperative();
                })
                .catch(() => {
                    setAddStatus({ isError: true, isLoading: false });
                });
        }
    }, [productToCart]);

    if (productsFetchState.isError) return <FetchErrorMessage resourceName="productos" />;
    if (productsFetchState.isLoading) return <FetchLoadingMessage resourceName="productos" />;
    if (products.length === 0) {
        return (
            "Aún no hay productos en la tienda."
        );
    }
    return (
        <>
            <ProductsContainer>
                {products.map(product =>
                    <ProductCard
                        key={product._id}
                        productId={product._id}
                        name={product.name}
                        price={product.price}
                        setProductToCart={setProductToCart}
                    ></ProductCard>
                )}
            </ProductsContainer>
            <AddedProductModal
                fetchStatus={addStatus}
                productToCart={productToCart}
                show={showAddedProductModal}
                setShow={setShowAddedProductModal}
            />
        </>
    );
}

