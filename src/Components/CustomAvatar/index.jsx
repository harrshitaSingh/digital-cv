import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const CustomAvatar = ({ margin = '20px auto', avatarStyles, onClick }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    function stringAvatar(name) {
        const initials = name.split(' ').map(word => word[0]).join('').slice(0, 2);
        return {
          sx: {
            bgcolor: "#4b2354",
            margin: margin,
            ...avatarStyles,
            cursor: "pointer",
          },
          children: initials || "?",
          onClick: onClick,
        };
    }

    return (
        <Stack>
            {name ? (
                <Avatar {...stringAvatar(name)} />
            ) : (
                <Avatar onClick={onClick}>?</Avatar> 
            )}
        </Stack>
    );
};

export default CustomAvatar;
