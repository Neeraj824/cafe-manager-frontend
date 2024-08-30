import React, { useState, useEffect } from 'react';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, updateEmployee, getEmployeeById } from '../api/employeeApi'; // Ensure these API functions are defined
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee as updateEmployeeAction } from '../redux/employeereducers';
import { getCafes } from '../api/cafeApi'; // Assuming you have an API function to get cafes
import { setCafes } from '../redux/cafereducers'; // Action to set cafes in Redux
import ReusableTextField from './ReusableTextField';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email_address: '',
    phone_number: '',
    gender: '',
    cafe_id: '',
  });
  const [errors, setErrors] = useState({});
  const cafeList = useSelector((state) => state.cafe.cafes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeeId, cafeId } = useParams();

  useEffect(() => {
    if (employeeId) {
      // Fetch employee details if editing
      getEmployeeById(employeeId, cafeId).then((data) => {
        data.cafe_id = cafeId;
        setFormData(data);
      });
    }

    // Fetch cafes list if not already fetched
    if (!cafeList.length) {
      const fetchCafes = async () => {
        const data = await getCafes();
        dispatch(setCafes(data));
      };
      fetchCafes();
    }
  }, [employeeId, dispatch, cafeList.length, cafeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[89]\d{7}$/;

    if (formData.name.length < 6 || formData.name.length > 10) {
      newErrors.name = 'Name must be between 6 and 10 characters.';
    }
    if (!emailRegex.test(formData.email_address)) {
      newErrors.email_address = 'Invalid email address.';
    }
    if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = 'Phone number must start with 8 or 9 and have 8 digits.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (employeeId) {
      await updateEmployee(employeeId, formData);
      dispatch(updateEmployeeAction(formData));
    } else {
      const newEmployee = await createEmployee(formData);
      dispatch(addEmployee(newEmployee));
    }

    navigate(`/employees/${cafeId}`);
  };

  const handleCancel = () => {
    if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
      navigate(`/employees/${cafeId}`);
    }
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
          {employeeId ? 'Edit Employee' : 'Add New Employee'}
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
                  label="Email Address"
                  name="email_address"
                  type="email"
                  value={formData.email_address}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <ReusableTextField
                  label="Phone Number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={Boolean(errors.phone)}
                  inputProps={{ pattern: '^[89][0-9]{7}$' }}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" required fullWidth>
                  <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Assigned Café</InputLabel>
                  <Select
                    name="cafe_id"
                    value={formData.cafe_id}
                    onChange={handleChange}
                  >
                    <MenuItem value="">None</MenuItem>
                    {cafeList.map((cafe) => (
                      <MenuItem key={cafe.id} value={cafe.id}>
                        {cafe.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            {employeeId ? 'Update Employee' : 'Add Employee'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EmployeeForm;
