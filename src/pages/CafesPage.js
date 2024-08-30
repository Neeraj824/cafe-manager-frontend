import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CafeTable from '../components/CafeTable';
import { setCafes, deleteCafe } from '../redux/cafereducers';
import { getCafes, deleteCafeAndEmployee } from '../api/cafeApi';
import { useNavigate } from 'react-router-dom';

const CafesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cafes = useSelector((state) => state.cafe.cafes);

  useEffect(() => {
    const fetchCafes = async () => {
      const data = await getCafes();
      dispatch(setCafes(data));
    };

    fetchCafes();
  }, [dispatch]);

  const handleEdit = (cafe) => {
    navigate(`/cafe/${cafe.id}`);
  };

  const handleDelete = async (cafe) => {
    if (window.confirm('Are you sure you want to delete this café?')) {
      deleteCafeAndEmployee(cafe.id).then(() => {
        dispatch(deleteCafe(cafe.id));
      });
    }
  };

  return (
    <div>
      <CafeTable cafes={cafes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default CafesPage;