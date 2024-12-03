import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Signup from '../form/signup';
import Signin from '../form/signin';
import Sell from '../sell/sell';
import scrollToTop from '../scrollUtils';
import { useNavigate } from 'react-router-dom';



const pages = ['Home', 'About Us', 'Solar Panels', 'Sell', 'Your Plantations', 'Login', 'Signup'];
const DrawerComp = ({ isLoggedIn, isAdmin, isSeller, openDialog, onYourPlantations, solarPanels, handleLogout }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [isLoggedIn, setisLoggedIn] = React.useState(false);
  // const [isAdmin, setisAdmin] = React.useState(true);
  // const [isSeller, setisSeller] = React.useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const navigate = useNavigate();

  // const openDialog = (type) => {
  //   setIsDialogOpen(true);
  //   setDialogType(type);
  // };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogType(null);
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >


        <List>
        <ListItemButton onClick={() => { navigate('/'); scrollToTop(); }}>
            <ListItemIcon>
            <ListItemText>Home</ListItemText>
            </ListItemIcon>
        </ListItemButton>
        <ListItemButton onClick={() => { navigate('/about-us'); scrollToTop(); }}>
            <ListItemIcon>
            <ListItemText>About Us</ListItemText>
            </ListItemIcon>
        </ListItemButton>
        <ListItemButton onClick={() => { solarPanels(); }}>
            <ListItemIcon>
            <ListItemText>Solar Panels</ListItemText>
            </ListItemIcon>
        </ListItemButton>
        {isSeller && (
        <>
            <ListItemButton onClick={() => openDialog('sell')}>
                <ListItemIcon>
                <ListItemText>Sell</ListItemText>
                </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={onYourPlantations}>
                <ListItemIcon>
                <ListItemText>Your Plantations</ListItemText>
                </ListItemIcon>
            </ListItemButton>
        </>
        )}
        {isLoggedIn ? (
        <div>    
            <ListItemButton>
                <ListItemIcon>
                <ListItemText>Personal Information</ListItemText>
                </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <ListItemText>Change Password</ListItemText>
                </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                <ListItemText>Logout</ListItemText>
                </ListItemIcon>
            </ListItemButton>
        </div>
        ) : (
            <div>    
            <ListItemButton onClick={() => openDialog('signin')}>
                <ListItemIcon>
                <ListItemText>Login</ListItemText>
                </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => openDialog('signup')}>
                <ListItemIcon>
                <ListItemText>Signup</ListItemText>
                </ListItemIcon>
            </ListItemButton>
            </div>
        )}
        </List>
        
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
      {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          onClose={closeDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              maxHeight: '60vh',
              width: '40vw',
              minHeight: '30%',
              borderRadius: 16,
            },
          }}
        >
          <DialogContent>
            {dialogType === 'signin' && <Signin onClose={closeDialog} />}
            {dialogType === 'signup' && <Signup onClose={closeDialog} />}
            {dialogType === 'sell' && <Sell onClose={closeDialog} />}
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default DrawerComp;