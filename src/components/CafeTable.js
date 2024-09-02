import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // Import Ag-Grid
import { Button, Grid, TextField, Box } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css'; // Ag-Grid styles
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CafesPage = ({ cafes, onEdit, onDelete }) => {
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredCafes(cafes);
  }, [cafes]);

  // Handle location filtering
  const handleLocationFilter = (e) => {
    const value = e.target.value;
    console.log("value",value)
    setLocationFilter(value);
    if (value) {
      setFilteredCafes(cafes.filter(cafe => cafe.location.toLowerCase().includes(value.toLowerCase())));
    } else {
      setFilteredCafes(cafes);
    }
  };

  const handleDelete = (cafe) => {
    onDelete(cafe);
  };
  const handleEdit = (cafe) => {
    onEdit(cafe);
  };
  // Handle employee click
  const handleEmployeeClick = (cafeId) => {
    navigate(`/employees/${cafeId}`);
  };

  const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual base URL
  const columns = [
    {
      headerName: 'Logo',
      field: 'logo',
      cellRenderer: ({ value }) => {
        if (!value) {
          return <span>No Logo</span>; 
        }
        const logoUrl = `${API_BASE_URL}${value}`;
        return <img src={logoUrl} alt="Logo" width="50" style={{ borderRadius: '8px' }} />;
      },
      flex: 1, minWidth: 150 
    },
    { headerName: 'Name', field: 'name' ,flex: 1, minWidth: 150  },
    { headerName: 'Description', field: 'description',flex: 1, minWidth: 150  },
    { 
      headerName: 'Employees', 
      field: 'employees', 
      cellRenderer: ({ data }) => (
        <Button variant="contained" size="small" onClick={() => handleEmployeeClick(data.id)}>
          View Employees
        </Button>
      ),
      flex: 1, minWidth: 150  
    },
    { headerName: 'Location', field: 'location' ,flex: 1, minWidth: 150 },
    {
      headerName: 'Actions',
      field: 'actions',
      flex: 1, minWidth: 150 ,
      cellRenderer: ({ data }) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outlined" size="small" onClick={() => handleEdit(data)}>
            Edit
          </Button>
          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(data)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Grid item>
          <Button variant="contained" onClick={() => navigate('/cafe')}>
            Add New Cafe
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Filter by location"
            variant="outlined"
            size="small"
            fullWidth
            value={locationFilter}
            onChange={handleLocationFilter}
          />
        </Grid>
      </Grid>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={filteredCafes}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </Box>
  );
};

export default CafesPage;
