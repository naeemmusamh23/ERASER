import React, { useContext } from 'react';
import Show from './role';
function Auth(props) {
    return (
        <Show condition={props.cond}>
            {props.children}
        </Show>
    )
}




export default Auth;