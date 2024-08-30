import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CafesPage from './pages/CafesPage';
import AddEditCafePage from './pages/AddEditCafePage';
import EmployeesPage from './pages/EmployeesPage';
import AddEditEmployeePage from './pages/AddEditEmployeePage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/cafes" replace />} />
        <Route path="/cafes" element={<CafesPage />} />
        <Route path="/cafe/:cafeId" element={<AddEditCafePage />} />
        <Route path="/cafe" element={<AddEditCafePage />} />
        <Route path="/employees/:cafeId" element={<EmployeesPage />} />
        <Route path="/employee/:cafeId/:employeeId" element={<AddEditEmployeePage />} />
        <Route path="/employee/:cafeId" element={<AddEditEmployeePage />} />
        
      </Routes>
    </Router>
  );
}

export default App;