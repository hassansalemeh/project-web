import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography, Link, InputAdornment, IconButton } from "@mui/material";
import { Box, Stack } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

function SignUp({ onClose, openDialog, openedFromLeafletMap }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [roleErrorMessage, setRoleErrorMessage] = useState('');

  const [selectedRole, setSelectedRole] = useState(null);
  const [date, setDate] = React.useState(dayjs().startOf('day'));
  const [location, setLocation] = React.useState(null); //''

  // const handleChange = (event) => {
  //   setLocation(event.target.value);
  // };
  const handleChange = (event, newValue) => {
    setLocation(newValue);
  };

  const cities = [
    'Baabda',
    'Boutchay',
    'Hazmieh',
    'Mansourieh',
    'Bsalim'
  ];

  // const paperStyle = { padding: 20, width: 750 };
  // const btnstyle = { backgroundColor:'#FFC857',color:'rgba(12, 12, 12, 0.87)',fontWeight:'900',fontSize:'20px',width:'150px',borderRadius:'80px',margin:'20px auto',textTransform: 'none' };
  // const linkstyle = { color: '#FFC857', textDecorationColor: '#FFC857' }

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

  const validateForm = () => {
    let isValid = true;
    if (firstName.length < 2) {
      setFirstNameError('First name should have at least 2 characters.');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (lastName.length < 2) {
      setLastNameError('Last name should have at least 2 characters.');
      isValid = false;
    } else {
      setLastNameError('');
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
      isValid = false;
    } else {
      setEmailError('');
    }

    const phoneRegex = /^(03|70|71|76|80|81)\d{6}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('Invalid lebanese phone number.');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    if (username.length < 3) {
      setUsernameError('Username should have at least 3 characters.');
      isValid = false;
    } else {
      setUsernameError('');
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password should be at least 8 characters with one uppercase letter, one lowercase letter, one digit, and one special character.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!selectedRole) {
      setRoleErrorMessage('Please select a role.');
      isValid = false;
    } else {
      setRoleErrorMessage('');
    }

    return isValid;
  };

  const handleClearErrorMessage = () => {
    setErrorMessage('');
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:3000/auth/signup', {
          firstName: firstName,
          lastName: lastName,
          username: username,
          phoneNumber: phoneNumber,
          email: email,
          password: password,
          dateOfBirth: date,
          location: location,
          roleChoice: selectedRole,
        })
        .then((response) => {
          console.log('Response:', response.data);
          if (response.data.status === 'SUCCESS') {
            alert('Account created successfully!');

            onClose();
            if (!openedFromLeafletMap) {
              openDialog('signin');
            }
          } else if (response.data.status === 'FAILED') {
            console.error('Signup failed:', response.data.message);
            setErrorMessage(response.data.message);
          } else {
            console.error('Signup failed: Unexpected response format');
            setErrorMessage('Unexpected response format.');
          }
        })
        .catch((error) => {
          console.error('Signup failed:', error.response?.data);
    
          setErrorMessage(error.response?.data.message);
        });
    }
  }; 

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="45vh"
    >
      <Paper elevation={0} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems='center' justifyContent='center'>
            <h3 style={{ marginBottom: '20px' }}>Sign Up</h3>
          </Grid>
          <Stack spacing={2} direction={'column'}>
            {/* <Stack spacing={4} direction={'row'}> */}
            <Stack spacing={4} direction={{ xs: 'column', sm: 'row' }}>
              <TextField label='First Name' variant="outlined" placeholder='Enter First Name' fullWidth required 
                value={firstName} onChange={(e) => setFirstName(e.target.value)} error={!!firstNameError} helperText={firstNameError}
              />
              <TextField label='Last Name' variant="outlined" placeholder='Enter Last Name' fullWidth required
                value={lastName} onChange={(e) => setLastName(e.target.value)} error={!!lastNameError} helperText={lastNameError}
              />
            </Stack>
            {/* <Stack spacing={4} direction={'row'}> */}
            <Stack spacing={4} direction={{ xs: 'column', sm: 'row' }}>
              <TextField label='Email' variant="outlined" placeholder='Enter Email' type='email' fullWidth required
                value={email} onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError}
              />
              <TextField label='Phone Number' variant="outlined" placeholder='Enter Phone Number' type='tel' fullWidth required
                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} error={!!phoneNumberError} helperText={phoneNumberError}
              />
            </Stack>
            {/* <Stack spacing={4} direction={'row'}> */}
            <Stack spacing={4} direction={{ xs: 'column', sm: 'row' }}>
            {/* <FormControl fullWidth sx={{ width: '50%' }}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                label="Location"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
            <Autocomplete
                  options={cities}
                  fullWidth
                  value={location}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      variant="outlined"
                      sx={{ width: '100%' }} //50%
                      required
                    />
                  )}
              />
             <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DemoContainer components={['DatePicker', 'DatePicker']}> */}
                <DatePicker
                  label="Date of Birth"
                  variant="outlined"
                  placeholder='Date of Birth'
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  fullWidth
                  required
                  sx={{ width: '100%' }}
                />
              {/* </DemoContainer> */}
            </LocalizationProvider>
            </Stack>
            {/* <Stack spacing={4} direction={'row'}> */}
            <Stack spacing={4} direction={{ xs: 'column', sm: 'row' }}>
              <TextField label='Username' variant="outlined" placeholder='Enter Username' fullWidth required
                value={username} onChange={(e) => {setUsername(e.target.value)}} error={!!usernameError} helperText={usernameError}
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
                error={!!passwordError} 
                helperText={passwordError}
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
            </Stack>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} required>
              <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <FormControlLabel value="Buyer" control={<Radio />} label="Buyer" />
                <FormControlLabel value="buyAndSell" control={<Radio />} label="Seller" />
              </RadioGroup>
            </FormControl>
            {roleErrorMessage && !errorMessage &&(
            <Typography style={{ color: 'red', textAlign: 'center' }}>
              {roleErrorMessage}
            </Typography>
          )}
            {errorMessage && !roleErrorMessage && (
              <Typography style={{ color: 'red', textAlign: 'center' }}>
                {errorMessage}
              </Typography>
            )}
            {/* <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleClearErrorMessage}>Sign Up</Button> */}
            <Button type='submit' variant="contained" style={btnstyle} onClick={handleClearErrorMessage}>Sign Up</Button>
          </Stack>
        </form>
        {!openedFromLeafletMap && (
              <Stack spacing={2}>
                <Typography style={{ textAlign: 'center' }}>
                  Have an account?&nbsp;
                  {/* LINK???? */}
                  <Link
                    style={linkstyle}
                    onClick={() => {
                      onClose(); // Close the Sign Up dialog
                      openDialog('signin'); // Open the Sign In dialog
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Stack>
            )}
      </Paper>
    </Box>
  );
};

export default SignUp;