import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import MyContext from '../MyContext';

const StyledLabel = styled.label`
    opacity: 0.5;
`;

function UserEmail({ isAdmin }) {
    const { context } = useContext(MyContext);
    return (
        <>
            <StyledLabel>Sesión iniciada como </StyledLabel>
            {isAdmin ?
                <span>Administrador</span>
                :
                <span>{context?.userEmail}</span>
            }
        </>
    );
}

export default UserEmail;