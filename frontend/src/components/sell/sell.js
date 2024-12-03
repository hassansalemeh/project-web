import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { Box, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

function Sell({ onClose, openDialog }) {
  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');


  const [titleError, settitleError] = useState('');
  const [descriptionError, setdescriptionError] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  // const handleChange = (event) => {
  //   setLocation(event.target.value);
  // };
  const handleChange = (event, newValue) => {
    setLocation(newValue);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Process the file as needed
    setImage(file);
  };

  const cities = [
    'Baabda',
    'Boutchay',
    'Hazmieh',
    'Mansourieh',
    'Bsalim'
  ];

//   const paperStyle = { padding: 20, width: 750 };
//   const btnstyle = { backgroundColor:'#FFC857',color:'rgba(12, 12, 12, 0.87)',fontWeight:'900',fontSize:'20px',width:'150px',borderRadius:'80px',margin:'20px auto',textTransform: 'none' };

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

  const validateForm = () => {
    let isValid = true;
    if (title.length < 2) {
      settitleError('Title should have at least 2 characters.');
      isValid = false;
    } else {
      settitleError('');
    }

    if (description.length < 3 || description.length > 200) {
      setdescriptionError('Descripton should be 200 characters maximum.');
      isValid = false;
    } else {
      setdescriptionError('');
    }

    return isValid;
  };

  const handleClearErrorMessage = () => {
    setErrorMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
        const authToken = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('image', image);

      axios
        .post('http://localhost:3000/solar-panel/solar-panels', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${authToken}`
            }
          })
        .then((response) => {
          console.log('Response:', response.data);
          if (response.data.status === 'SUCCESS') {
            alert('Solar panel ad posted successfully!');

            onClose();
          } else if (response.data.status === 'FAILED') {
            console.error('Sell failed:', response.data.message);
            setErrorMessage(response.data.message);
          } else {
            console.error('Sell failed: Unexpected response format');
            setErrorMessage('Unexpected response format.');
          }
        })
        .catch((error) => {
          console.error('Sell failed:', error.response?.data);
    
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
            <h3 style={{ marginBottom: '20px' }}>List your product</h3>
          </Grid>
          <Stack spacing={2} direction={'column'}>
            {/* <Stack spacing={4} direction={'row'}> */}
            <Stack spacing={4} direction={{ xs: 'column', sm: 'row' }}>
              <TextField label='Title' variant="outlined" placeholder='Enter Title' fullWidth required 
                value={title} onChange={(e) => settitle(e.target.value)} error={!!titleError} helperText={titleError}
              />
              <TextField label='Price' variant="outlined" placeholder='Enter Price' type='number' fullWidth required
                value={price} onChange={(e) => setprice(e.target.value)}
              />
            </Stack>
            {/* <Stack spacing={4} direction={'row'}> */}
            <Stack spacing={4} direction={{ xs: 'column', sm: 'row' }}>
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
                    //   sx={{ width: '100%', marginTop: '22px' }} //50%
                    sx={{ width: '100%' }}
                      required
                    />
                  )}
              />
              {/* <TextField label='Image' variant="outlined" placeholder='Enter Image' type='file' fullWidth required
                value={image} onChange={(e) => handleImageChange(e)}
              /> */}
              {/* <FormControl fullWidth>
                <FormLabel component="legend">Image *</FormLabel> */}
                <TextField
                // label='Image'
                variant="outlined"
                type='file'
                fullWidth
                required
                // value={image}
                // InputProps={{
                //     startAdornment: (
                //       <InputLabel shrink htmlFor="image-input">
                //         Choose Image
                //       </InputLabel>
                //     ),
                //   }}
                // inputProps={{ id: 'image-input' }}
                onChange={(e) => handleImageChange(e)}
                helperText="Please upload an image"
                />
            {/* </FormControl> */}
            </Stack>
            {/* <Stack spacing={4} direction={'row'}> */}
            <Stack spacing={4} direction={{ xs: 'column', sm: 'row' }}>
              <TextField label='Description' variant="outlined" placeholder='Enter Description' fullWidth required multiline rows={4}
                value={description} onChange={(e) => {setdescription(e.target.value)}} error={!!descriptionError} helperText={descriptionError}
              />
            </Stack>
            {errorMessage && (
              <Typography style={{ color: 'red', textAlign: 'center' }}>
                {errorMessage}
              </Typography>
            )}
            {/* <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleClearErrorMessage}>Sign Up</Button> */}
            <Button type='submit' variant="contained" style={btnstyle} onClick={handleClearErrorMessage}>List</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Sell;