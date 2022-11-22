import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/Store/ProductCard';
import getProducts from '../Services/getProducts';
import addToCart from '../Services/addToCart';
import ProductsContainer from '../Components/Store/ProductsContainer';
import DinamicModal from '../Components/Store/DinamicModal';
import { Descriptions } from 'antd';
import { useContext } from 'react';
import MyContext from '../MyContext';


export default function StorePage() {
    const { getCartImperative } = useContext(MyContext);

    // states for fetching products
    const [products, setProducts] = useState(null);
    const [isError, setIsError] = useState(false);

    // status for adding to cart request
    const [productToCart, setProductToCart] = useState(null);
    const [addStatus, setAddStatus] = useState("loading");
    const [showCartConfirmationModal, setShowCartConfirmationModal] = useState(false);

    useEffect(() => {
        //get all products in store
        getProducts().then(result => {
            setProducts(result);
            setIsError(false);
        }).catch(error => isError(true));
    }, []);

    useEffect(() => {
        //update cart through api when productToCart changes.
        if (productToCart === null) {
            setShowCartConfirmationModal(false);
        } else {
            addToCart(productToCart, setAddStatus);
            getCartImperative();
            setShowCartConfirmationModal(true);
        }
    }, [productToCart]);

    if (isError) return "Error!";
    if (products === null) return "Loading...";
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
            <DinamicModal
                type={addStatus}
                show={showCartConfirmationModal}
                setShow={setShowCartConfirmationModal}
                successTitle="Producto agregado"
            >
                {productToCart &&
                    <Descriptions title="" layout='horizonal'>
                        <Descriptions.Item
                            label=""
                        >{`${productToCart.name} \t X ${productToCart.qty}`}</Descriptions.Item>
                    </Descriptions>
                }
            </DinamicModal>

        </>
    );
}

