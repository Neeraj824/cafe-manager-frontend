import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getEmployees = async (cafeId) => {
  const response = await axios.get(`${API_URL}/employees`, { params: { cafeId } });
  return response.data;
};

export const getEmployeeById = async (id, cafeId) => {
  try {
    const employees = await getEmployees(cafeId);
    const employee = employees.find(emp => emp.id === id);
    console.log(employee)
    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    throw error;
  }
};

export const createEmployee= async (employeeData) => {

  console.log(employeeData)

  const response = await axios.post(`${API_URL}/employee`, employeeData, {
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  return response.data; 
};

export const updateEmployee = async (employeeId,employeeData) => {

  employeeData.id = employeeId;
  console.log("TEST  Update Data",employeeData)
  
  const response = await axios.put(`${API_URL}/employee`, employeeData, {
    headers: {
      'Content-Type': 'application/json', 
    },
  });
  return response.data;
  // const response = await axios.put(`${API_URL}/employee`, employeeData);
  // return response.data;
};

export const deleteEmployeeAndCafe = async (id) => {
  await axios.delete(`${API_URL}/employee`, { data: { id } });
};
