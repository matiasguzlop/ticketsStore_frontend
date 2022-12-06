import React from 'react';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../MyContext';
import isLogged from '../Services/isLogged';


function IsLoggedChecker({ requiredAttributes }) {
    const { setContext } = useContext(MyContext);
    const navigate = useNavigate();
    useEffect(() =>
        async () => {
            try {
                const response = await isLogged();
                const loggedAttributes = response.data.message.user.attributes;
                if (requiredAttributes === 'user')
                    setContext(prev => ({
                        ...prev,
                        userId: response.data.message.user._id,
                        userAttributes: response.data.message.user.attributes,
                        userEmail: response.data.message.user.email,
                        cartId: response.data.message.user.cartId
                    }));
                if (loggedAttributes !== requiredAttributes) {
                    if (loggedAttributes === "user") navigate('/', { relative: 'path' });
                    if (loggedAttributes === "admin") navigate('/admin', { relative: 'path' });
                }
            } catch (error) {
                console.log(error);
                navigate('/login');
            }

        }
        , []);
    return (
        <>
        </>
    );
}

export default IsLoggedChecker;