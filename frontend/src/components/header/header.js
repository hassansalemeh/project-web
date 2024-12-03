import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Signup from '../form/signup';
import Signin from '../form/signin';
import Sell from '../sell/sell'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { InputAdornment } from '@mui/material';
import SearchResults from './SearchResults';
import { useNavigate } from 'react-router-dom';
import scrollToTop from '../scrollUtils';
import logo from '../../images/logo.png'
import { Link } from '@mui/material'

import DrawerComp from "./drawer";

const pages = ['Home', 'About Us', 'Solar Panels', 'Sell', 'Your Plantations'];

function Header({ onSearchResultsChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const [isAdmin, setisAdmin] = React.useState(false);
  const [isSeller, setisSeller] = React.useState(false);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("1150")); //1071 1186

  const isMatchSearch = useMediaQuery(theme.breakpoints.down("1295"));
  const isMatchSearch1 = useMediaQuery(theme.breakpoints.down("1190"));

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const btnstyle = {
    backgroundColor: '#57c1ff',
    color: 'rgba(12, 12, 12, 0.87)',
    fontWeight: '900',
    fontSize: '16px',
    width: '50%',  // Adjust the width as needed
    borderRadius: '150px',
    margin: '20px auto',
    textTransform: 'none',
  };

  const linkstyle = { color: '#57c1ff', textDecorationColor: '#57c1ff' }

  const handleLogin = (status) => {
    setisLoggedIn(status);

    // Fetch user roles and update isAdmin and isSeller accordingly
    if (status) {
      setisLoggedIn(true);
      // Fetch user roles from local storage
      const rolesFromStorage = JSON.parse(localStorage.getItem("roles"));

      // Check if the roles list contains 'seller'
      const isSeller = rolesFromStorage && rolesFromStorage.includes('seller');
      
      // Update isAdmin and isSeller accordingly
      setisAdmin(rolesFromStorage && rolesFromStorage.includes('admin'));
      setisSeller(isSeller);
    } else {
      setisAdmin(false);
      setisSeller(false);
    }
  };

  const handleLogout = () => {
    //localStorage.removeItem("token");
    //localStorage.removeItem("userId");
    localStorage.clear();
    setisAdmin(false);
    setisLoggedIn(false);
    setisSeller(false);
    window.location.reload();
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/solar-panel/search-solar-panels?q=${searchQuery}`);
      // Update state with search results
      onSearchResultsChange(response.data.data);
    } catch (error) {
      console.error('Error searching solar panels:', error.response?.data);
    }
  };

  const handleSearchAll = async () => {
    try {
      if (!isLoggedIn) {
        setIsLoginDialogOpen(true);
        return;
      }
      const response = await axios.get(`http://localhost:3000/solar-panel/solar-panels`);
      // Update state with search results
      onSearchResultsChange(response.data.data);
    } catch (error) {
      console.error('Error searching solar panels:', error.response?.data);
    }
  };

  const handleYourPlantations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/solar-panel/user-solar-panels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update state with search results
      onSearchResultsChange(response.data.data);
    } catch (error) {
      console.error('Error searching solar panels:', error.response?.data);
    }
  };


  const handleClear = () => {
    setSearchQuery('');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const openDialog = (type) => {
    setIsDialogOpen(true);
    setDialogType(type);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogType(null);
  };

  React.useEffect(() => {
    const checkTokenValidity = async () => {
      // Check if a valid token exists in localStorage
      const token = localStorage.getItem('token');
  
      if (token) {
        try {
          // Send the token to the server for verification
          const response = await axios.post('http://localhost:3000/user/check-token', null, {
            headers: {
            Authorization: `bearer ${token}`,
            }
          });
  
          if (response.data.valid) {
            // The token is valid
            setisLoggedIn(true);
            console.log("hi")

            const roles = response.data.data.roles;
            setisAdmin(roles.includes('admin'));
            setisSeller(roles.includes('seller'));

          } else {
            // The token is not valid; handle accordingly
            console.error('Invalid token');
            setisLoggedIn(false); // Update isLoggedIn state
            setisAdmin(false); // Update isAdmin state
            setisSeller(false);
            // You may want to redirect the user to the login page or handle it in another way
          }
        } catch (error) {
          console.error('Error checking token validity:', error.response?.data);
        }
      }
    };
  
    checkTokenValidity();
  }, []);

  return (
    <React.Fragment>
        <AppBar position="fixed" sx={{ backgroundColor: '#181818' , boxShadow: 'none' }}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <IconButton sx={{ p: 0 }}>
                    <Avatar alt="logo" src={logo}/>
            </IconButton>
            {isMatch ? (
            <>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', marginX: 'auto', width: isMatchSearch ? '80%' : '80%',}}> */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginX: 'auto', width: '80%'}}>
            <TextField
                  // label="Search"
                  label={searchQuery ? '' : 'Search'}
                  variant="outlined"
                  size="small"
                  color="primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputLabelProps={{ shrink: false }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchQuery && (
                          <IconButton size="small" onClick={handleClear} edge="end">
                            <ClearIcon />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleSearch();
                          }}
                          edge="end"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    width: '80%',
                    '& .MuiInputLabel-root': {
                      color: 'black !important', // Adjust the label color here
                    },
                    '& .MuiInputLabel-outlined': {
                      color: 'black', // Adjust the placeholder color here
                    },
                    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                      color: 'none', // Adjust the color when the label shrinks (input has value)
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 5,
                      backgroundColor: 'white', // Adjust the background color here
                      '& fieldset': {
                        borderColor: 'black', // Adjust the border color here
                      },
                      '& input': {
                        color: 'black', // Adjust the text color here
                      },
                      // '&:hover fieldset': {
                      //   borderColor: '#FFC857', // Adjust the hover border color here
                      // },
                      // '&.Mui-focused fieldset': {
                      //   borderColor: '#FFC857', // Adjust the focused border color here
                      // },
                      // '&.Mui-focused .MuiInputLabel-root': {
                      //   color: '#FFC857', // Adjust the focused label color here
                      // },
                      '&.Mui-focused': {
                        '& fieldset': {
                          borderColor: 'black', // Adjust the focused border color here
                        },
                        '& input': {
                          color: 'black', // Adjust the focused text color here
                        },
                        // '& .MuiInputLabel-root': {
                        //   color: 'black', // Adjust the focused label color here
                        // },
                      },
                    },
                  }}
                  onFocus={(e) => e.preventDefault()} // Prevent focus on click
                />

                {/* <IconButton
                  size="small"
                  sx={{ color: 'white', marginLeft: 1 }}
                  onClick={() => {
                    // Handle search button click
                  }}
                >
                  <SearchIcon />
                </IconButton> */}
              </Box>
              <DrawerComp isLoggedIn={isLoggedIn} isAdmin={isAdmin} isSeller={isSeller} openDialog={openDialog} onYourPlantations={handleYourPlantations} solarPanels={handleSearchAll} handleLogout={handleLogout}/>
            </>
          ) : (
            <>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                        sx={{ mx: 2, color: 'white', fontSize: '1.1rem' }}
                        onClick={() => { navigate('/'); scrollToTop(); }}
                    >
                        Home
                    </Button>
                    <Button
                        sx={{ mx: 2, color: 'white', fontSize: '1.1rem' }}
                        onClick={() => { navigate('/about-us'); scrollToTop(); }}
                    >
                        About Us
                    </Button>
                    <Button
                        sx={{ mx: 2, color: 'white', fontSize: '1.1rem' }}
                        onClick={() => {
                          handleSearchAll();
                        }}
                    >
                        Solar Panels
                    </Button>
                    {/* {isSeller && isLoggedIn && (
                    <>
                        <Button
                            sx={{ mx: 2, color: 'white', fontSize: '1.1rem' }}
                        >
                            Sell
                        </Button>
                        <Button
                            sx={{ mx: 2, color: 'white', fontSize: '1.1rem' }}
                        >
                            Your Plantations
                        </Button>
                    </>
                    )} */}
                    
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  // label="Search"
                  label={searchQuery ? '' : 'Search'}
                  variant="outlined"
                  size="small"
                  color="primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputLabelProps={{ shrink: false }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchQuery && (
                          <IconButton size="small" onClick={handleClear} edge="end">
                            <ClearIcon />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleSearch();
                          }}
                          edge="end"
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    // width: 500,
                    // width: isMatchSearch ? 400 : 500,
                    // width: isMatchSearch ? 400 : (isMatchSearch1 ? 300 : 500),
                    width: isMatchSearch ? 400 : (isMatchSearch1 ? 250 : 550),
                    
                    '& .MuiInputLabel-root': {
                      color: 'black !important', // Adjust the label color here
                    },
                    '& .MuiInputLabel-outlined': {
                      color: 'black', // Adjust the placeholder color here
                    },
                    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                      color: 'none', // Adjust the color when the label shrinks (input has value)
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 5,
                      backgroundColor: 'white', // Adjust the background color here
                      '& fieldset': {
                        borderColor: 'black', // Adjust the border color here
                      },
                      '& input': {
                        color: 'black', // Adjust the text color here
                      },
                      // '&:hover fieldset': {
                      //   borderColor: '#FFC857', // Adjust the hover border color here
                      // },
                      // '&.Mui-focused fieldset': {
                      //   borderColor: '#FFC857', // Adjust the focused border color here
                      // },
                      // '&.Mui-focused .MuiInputLabel-root': {
                      //   color: '#FFC857', // Adjust the focused label color here
                      // },
                      '&.Mui-focused': {
                        '& fieldset': {
                          borderColor: 'black', // Adjust the focused border color here
                        },
                        '& input': {
                          color: 'black', // Adjust the focused text color here
                        },
                        // '& .MuiInputLabel-root': {
                        //   color: 'black', // Adjust the focused label color here
                        // },
                      },
                    },
                  }}
                  onFocus={(e) => e.preventDefault()} // Prevent focus on click
                />

                {/* {searchQuery && (
                  <IconButton
                    size="small"
                    sx={{ color: 'white' }}
                    onClick={handleClear}
                  >
                    <ClearIcon />
                  </IconButton>
                )}

                <IconButton
                  size="small"
                  sx={{ color: 'white', marginLeft: 1 }}
                  onClick={() => {
                    // Handle search button click
                  }}
                >
                  <SearchIcon />
                </IconButton> */}
              </Box>
            </Box>

            

            <Box sx={{ flexGrow: 0 }}>
                {isLoggedIn ? (
                <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle fontSize='large'/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {isSeller && <MenuItem onClick={() => { handleYourPlantations(); handleClose(); }}>Your Plantations</MenuItem>}
                    {isSeller && (
                      <MenuItem onClick={() => { handleClose(); openDialog('sell'); }}>
                        Sell
                      </MenuItem>
                    )}
                    {/* {isSeller && <MenuItem onClick={handleClose}>Sell</MenuItem>} */}
                    <MenuItem onClick={handleClose}>Personal Information</MenuItem>
                    <MenuItem onClick={handleClose}>Change Password</MenuItem>
                    <MenuItem onClick={() => { handleLogout(); handleClose(); }}>Logout</MenuItem>
                </Menu>
                </div>
            ) : (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                        onClick={() => openDialog('signin')} // Open the Signin dialog
                        sx={{ mx: 2, color: 'white', fontSize: '1.1rem' }}
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={() => openDialog('signup')} // Open the Signup dialog
                        sx={{ mx: 2, color: 'white', fontSize: '1.1rem' }}
                    >
                        Sign Up
                    </Button>
                </Box>
            )}
            </Box>
            </>
          )}
            </Toolbar>
        </Container>
        </AppBar>
        {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          // onClose={closeDialog}
          maxWidth="md"
          fullWidth
          // PaperProps={{
          //   style: {
          //     height: '67vh',
          //     width: '40vw',
          //     // minHeight: '30%',
          //     borderRadius: 16,
          //   },
          // }}
          PaperProps={{
            style: {
              height: 'auto', // Set height to auto
              width: '80%', // Adjust width
              maxWidth: '600px', // Set max width
              borderRadius: '16px',
            },
          }}
          
          static
          // onClose={() => null}
        >
          <DialogTitle>
            <IconButton
              edge="end"
              color="inherit"
              onClick={closeDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {dialogType === 'signin' && <Signin onClose={closeDialog} openDialog={openDialog} onLogin={handleLogin}/>}
            {dialogType === 'signup' && <Signup onClose={closeDialog} openDialog={openDialog} />}
            {dialogType === 'sell' && <Sell onClose={closeDialog} openDialog={openDialog} />}
          </DialogContent>
        </Dialog>
      )}
      {/* {searchResults.length > 0 && (
        <SearchResults results={searchResults} />
      )} */}

    {isLoginDialogOpen && (
      <Dialog open={true} onClose={() => setIsLoginDialogOpen(false)}>
        {/* <DialogTitle>Please Sign In</DialogTitle> */}
        <DialogContent style={{ textAlign: 'center' }}>
          <p>
            Please sign in or create an account to see all available offers.{' '}
          </p>
            {/* <Button variant="contained" style={btnstyle} onClick={() => { openDialog('signin'); closeDialog(); }}>Sign In</Button>
            <Button variant="contained" style={btnstyle} onClick={() => { openDialog('signup'); closeDialog(); }}>Sign Up</Button> */}
            <div>
            <Link
            style={linkstyle}
            onClick={() => {
              setIsLoginDialogOpen(false);
              openDialog('signin'); // Open the Sign In dialog
            }}
            >
              Sign In
            </Link>
            <Link
            style={{ ...linkstyle, marginLeft: '8px' }}
            onClick={() => {
              setIsLoginDialogOpen(false);
              openDialog('signup'); // Open the Sign In dialog
            }}
            >
              Sign Up
            </Link>
            </div>
        </DialogContent>
      </Dialog>
    )}
    </React.Fragment>
  );
}
export default Header;
