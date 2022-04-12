import {React, useState, useEffect} from "react";
import {formatRelative} from 'date-fns';

const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
})=>{

    return (
        <div>
            {photoURL ? (
                <img src={photoUrl} alt="Avatar" width="45" height="45"/>
            ): null}
            {displayName ? <p>{displayName}</p> : null}
            {createdAt?.seconds ? (
                <span>
                    {formatRelative(new Date(createdAt.seconds * 1000),new Date())}
                </span>
            ) : null}
            <p>{text}</p>
        </div>
    );
};

export default Message;