import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate,useParams } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Box, Typography, Grid } from '@mui/material';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleUpdate = (employee) => {
    onEdit(employee);
  };
  const navigate = useNavigate(); // Initialize navigate
  const { cafeId } = useParams();
  const columns = [
    { headerName: "Name", field: "name", flex: 1, minWidth: 150 },
    { headerName: "Email", field: "email_address", flex: 1, minWidth: 200 },
    { headerName: "Phone", field: "phone_number", flex: 1, minWidth: 120 },
    { headerName: "Days Worked", field: "days_worked", flex: 1, minWidth: 100 },
    { headerName: "Cafe", field: "cafe", flex: 1, minWidth: 150 },
    {
      headerName: 'Actions',
      field: 'actions',
      minWidth: 150,
      cellRenderer: ({ data }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small" onClick={() => handleUpdate(data)}>
            Edit
          </Button>
          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(data.id)}>
            Delete
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Employee List
      </Typography>
      <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Button variant="contained" onClick={() => navigate('/employee/' + cafeId)}>
            Add New Employee
          </Button>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={() => navigate('/cafes')}>
            Back
          </Button>
        </Grid>
      </Grid>

      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={employees}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </Box>
  );
};

export default EmployeeTable;