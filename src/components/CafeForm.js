import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCafe, updateCafe } from '../api/cafeApi';
import { useDispatch, useSelector } from 'react-redux';
import { addCafe, updateCafe as updateCafeAction } from '../redux/cafereducers';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import ReusableTextField from './ReusableTextField';
const CafeForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: null,
    location: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cafeId } = useParams();
  const cafe = useSelector((state) =>
    state.cafe.cafes.find((cafe) => cafe.id === cafeId)
  );
  

  useEffect(() => {
    if (cafe) {
      setFormData({
        name: cafe.name,
        description: cafe.description,
        logo: cafe.logo,
        location: cafe.location,
      });
    }
  }, [cafe]);


  const validate = () => {
    const newErrors = {};
    console.log("formData",formData)
    if (formData.name.length < 6 || formData.name.length > 10) {
      newErrors.name = 'Name must be between 6 and 10 characters.';
    }
    if (formData.description.length > 256) {
      newErrors.description = 'Description cannot exceed 256 characters.';
    }
    if (formData.logo && formData.logo.size > 2 * 1024 * 1024) { // Max size 2MB
      newErrors.logo = 'Logo file size should not exceed 2MB.';
    }
    console.log("formData",newErrors)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (cafeId) {
      formDataToSend.append('id', cafeId);
      await updateCafe(formDataToSend);
      dispatch(updateCafeAction({ ...formData, id: cafeId }));
    } else {
      const newCafe = await createCafe(formDataToSend);
      dispatch(addCafe(newCafe));
    }

    navigate('/cafes');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Card sx={{ maxWidth: 600, width: '100%', p: 3 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {cafeId ? 'Edit Cafe' : 'Add New Cafe'}
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ReusableTextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  inputProps={{ minLength: 6, maxLength: 10 }}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <ReusableTextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ maxLength: 256 }}
                  multiline
                  rows={4}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  type="file"
                  name="logo"
                  onChange={handleChange}
                  inputProps={{ accept: 'image/*' }}
                  fullWidth
                />
                {errors.logo && <Typography color="error">{errors.logo}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <ReusableTextField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {cafeId ? 'Update Cafe' : 'Add Cafe'}
          </Button>
          <Button color="secondary" onClick={() => navigate('/cafes')}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CafeForm;