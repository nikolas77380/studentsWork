import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';

const MenuComponent = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit">Home</Button>
                <Button color="inherit">TV Shows</Button>
                <Button color="inherit">About Us</Button>
            </Toolbar>
        </AppBar>
    );
};

export default MenuComponent;