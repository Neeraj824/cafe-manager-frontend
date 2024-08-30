import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeTable from '../components/EmployeeTable';
import { setEmployees ,deleteEmployee} from '../redux/employeereducers';
import {  useParams } from 'react-router-dom';
import { getEmployees,deleteEmployeeAndCafe } from '../api/employeeApi';
import { useNavigate } from 'react-router-dom';

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const employees = useSelector((state) => state.employee.employees);

  useEffect(() => {
    const fetchCafes = async (cafeId) => {
        let data;
        if(cafeId){
            data = await getEmployees(cafeId);
        }else{
            data = await getEmployees();
        }
      console.log("data",data)
      dispatch(setEmployees(data));
    };
    fetchCafes(cafeId);
  }, [cafeId,dispatch]);

  const handleEdit = (employee) => {
    console.log(cafeId,employee.id)
    navigate(`/employee/${cafeId}/${employee.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?'+id)) {
      deleteEmployeeAndCafe(id).then(() => {
        dispatch(deleteEmployee(id));
      });
    }
  };

  return (
    <div>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeesPage;