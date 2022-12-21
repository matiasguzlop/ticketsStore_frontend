import React from 'react';

function FormattedPrice({ currency = 'CLP', price }) {
    const formattedPrice = "$" + parseInt(price)
        .toLocaleString("es-CL", { currency: currency });
    return (
        formattedPrice
    );
}

export default FormattedPrice;