import React from 'react';


const Button = ({ onClick = null, children = null, cName = 'sign_in' })=> {
    return (<button onClick={onClick} className={cName}>{children}</button>)
}

export default Button;