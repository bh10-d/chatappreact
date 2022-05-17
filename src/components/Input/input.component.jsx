import React from 'react';


const Input = (props)=>{
    return (
        <input
            className={props.className}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            ref={props.ref}   
        />
    )
}

export default Input;