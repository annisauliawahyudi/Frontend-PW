import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paginate from '../components/Pagination';


const Giblar = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customer`);
        setCategory(response.data.data || []);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(category.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <h1>Customer List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f4f4f4' }}>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nama</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>NIK</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.nama}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.nik}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.jk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default Giblar;
