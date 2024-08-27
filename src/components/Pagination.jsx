import React from 'react';

const Paginate = ({ currentPage, totalPages, paginate }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          style={{
           
            backgroundColor: currentPage === i ? '#007bff' : '#f4f4f4',
            color: currentPage === i ? '#fff' : '#000',
           
          }}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          
        }}
      >
        {'<='}
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
         
        }}
      >
            {'=>'}
      </button>
    </div>
  );
};

export default Paginate;
