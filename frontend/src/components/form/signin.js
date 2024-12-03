import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography, Link, InputAdornment, IconButton } from "@mui/material";
import { Box, Stack } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Header from '../header/header';

function Login({ onClose, openDialog, onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    // const navigate = useNavigate();

    // const paperStyle = { padding: 100, width: 280 };
    const paperStyle = {
        padding: '20px', // Adjust padding
        width: '80%', // Adjust width
        maxWidth: '400px', // Set max width
      };
      
    // const btnstyle = { backgroundColor:'#FFC857',color:'rgba(12, 12, 12, 0.87)',fontWeight:'900',fontSize:'20px',width:'150px',borderRadius:'80px',margin:'20px auto',textTransform: 'none' };
    const btnstyle = {
        backgroundColor: '#57c1ff',
        color: 'rgba(12, 12, 12, 0.87)',
        fontWeight: '900',
        fontSize: '16px', // Adjust font size
        width: '70%', // Make it full width
        // width: {sm: '100%', md: '80%', lg: '60%'},
        borderRadius: '150px', // Adjust border radius
        margin: '20px auto',
        textTransform: 'none',
      };
      
    const linkstyle = { color: '#57c1ff', textDecorationColor: '#57c1ff' }

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = () => {
        setLoginMessage('');
        axios.post('http://localhost:3000/auth/login', { email: username, password })
          .then((response) => {
            if (response.data.status === 'SUCCESS') {
              const token = response.data.accessToken;
              console.log('Login successful. Token:', token);
      
              // Store the token in your preferred way (e.g., localStorage, Redux store, etc.)
              localStorage.setItem("token", token);
      
              alert('Login successful!');
              const userData = response.data.data[0];
              const userId = userData._id;
              localStorage.setItem("userId", userId);
      
              const rolesFromResponse = userData.roles;
              localStorage.setItem("roles", JSON.stringify(rolesFromResponse));
              
              onClose();
              onLogin(true);
            //   window.location.reload(); //maybe lezim chila

            //   navigate(`/`);
            } else if (response.data.status === 'FAILED') {
              console.error('Login failed:', response.data.message);
              setLoginMessage(response.data.message);
            } else {
              console.error('Login failed: Unexpected response format');
              setLoginMessage('Unexpected response format.');
            }
          })
          .catch((error) => {
            console.error('Login failed:', error.response?.data);
      
            // setLoginMessage('Invalid username or password.');
            setLoginMessage('Invalid credentials.');
          });
      };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="45vh"
        >
            <Paper elevation={0} style={paperStyle}>
                <Grid container alignItems='center' justifyContent='center'>
                    <h3 style={{ marginBottom: '20px' }}>Sign In</h3>
                </Grid>
                <Stack spacing={2}>
                    <TextField
                        label='Username or Email'
                        variant="outlined"
                        placeholder='Enter Username or Email'
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        variant="outlined"
                        placeholder='Enter Password'
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* <Button type='submit' color='primary' variant="contained" style={btnstyle} >Sign In</Button> */}
                    {/* onclick handleLogin function (axios) */}
                    <Button variant="contained" style={btnstyle} onClick={handleLogin}>Sign In</Button>
                </Stack>
                <Stack spacing={2}>
                    {loginMessage && (
                        <Typography style={{ textAlign: 'center', color: 'red' }}>{loginMessage}</Typography>
                    )}
                    <Typography style={{ textAlign: 'center' }}>
                        {/* <Link href="/reset-link" > */}
                        <Link style={ linkstyle }>
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography style={{ textAlign: 'center' }}> Don't have an account?&nbsp;
                        {/* <Link href="/signup" > */}
                        <Link 
                        style={ linkstyle }
                        onClick={() => {
                            onClose(); // Close the Sign In dialog
                            openDialog('signup'); // Open the Sign Up dialog
                          }}
                        >
                            SignUp
                        </Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
}

export default Login;
