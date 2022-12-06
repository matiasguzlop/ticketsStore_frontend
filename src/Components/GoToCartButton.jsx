import React, { useContext } from 'react';
import MyContext from '../MyContext';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CheckoutButton from '../Components/CheckoutButton';
import Badge from '../Components/Badge';
import { Link } from 'react-router-dom';
import { Button, Typography, Space } from 'antd';

const { Title } = Typography;

function GoToCartButton({ location }) {
    const { context } = useContext(MyContext);
    return (
        location === "/cart"
            ?
            <CheckoutButton></CheckoutButton>
            :
            <Link to="/cart" >
                <Badge count={context.cart.length}>
                    <Button
                        size='large'
                        type='primary'
                        icon={<ShoppingCartOutlined />}>
                        Ver carro
                    </Button>
                </Badge>
            </Link>
    );
}

export default GoToCartButton;