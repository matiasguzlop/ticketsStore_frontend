import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    console.log(error);
    return (
        <div>
            <h1>Error!</h1>
            <h2>{error.status}</h2>
            <p>{error.statusText}</p>
        </div>
    );
}

export default ErrorPage;