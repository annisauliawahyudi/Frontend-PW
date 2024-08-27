import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { FiTrash2 } from "react-icons/fi";
// import { LuPencil } from "react-icons/lu";
// import { FaPlus } from "react-icons/fa";
import Paginate from '../components/Pagination';
import { FaPlus } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import { LuPencil } from 'react-icons/lu';

const DataPembelian = () => {
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


  // keyword, page, limit

  // const changePage = ({ selected }) => {
  //   setPage(selected);
  //   if (selected === 9) {
  //     setMsg(
  //       "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
  //     );
  //   } else {
  //     setMsg("");
  //   }
  // };

  // const searchData = (e) => {
  //   e.preventDefault();
  //   setPage(0);
  //   setMsg("");
  //   setKeyword(query);
  // };


  return (
    <div className='p-5 h-screen'>
      <div className='bg-white overflow-auto rounded-lg shadow'>
        <div className='flex justify-between items-center py-2'>
          <h1 className='text-xl font-bold ml-4'>Data Pembelian</h1>
          <div className='flex gap-2 mr-4'>
            <button className='px-4 py-2 bg-[#1a311d] text-white rounded-md'>Export Excel</button>
            <button className='px-4 py-2 bg-[#00AA13] text-gray rounded-full'>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* Search Component */}
      {/* <SearchComponent query={query} setQuery={setQuery} searchData={searchData} /> */}
      
      {/* Tabel */}
      <div className='overflow-auto rounded-lg shadow md:block mt-6 hidden'> 
        <table className='w-full'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='w-20 p-3 text-sm font-semibold tracking-wide text-left'>No.</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Nama</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>NIK</th>
              <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-center'>Jumlah Pembelian</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Tanggal</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Aksi</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {loading ? (
              <tr>
                <td colSpan='7' className='py-5 text-center text-gray-500'>Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan='7' className='py-5 text-center text-red-500'>
                  Error fetching data: {error.message}
                </td>
              </tr>
            )  : category.length === 0 ? (
              <tr>
                <td colSpan='7' className='py-5 text-center text-gray-500'>No data available</td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr className='bg-white' key={item.id}>
                  <td className='p-3 text-sm text-gray-700'>
                    <a href="#" className='font-bold text-blue-500 hover:underline'>{index + 1}</a>
                  </td>
                  <td className='p-3 text-sm text-gray-700'>{item.nama}</td>
                  <td className='p-3 text-sm text-gray-700'>{item.nik}</td>
                  <td className='p-3 text-sm text-gray-700'>
                    <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50'>{item.status}</span>
                  </td>
                  <td className='p-3 text-sm text-gray-700 text-center'>{item.jumlahPembelian}</td>
                  <td className='p-3 text-sm text-gray-700'>{item.tanggal}</td>
                  <td className='p-3 text-sm flex gap-2'>
                    <a href="#" className='text-red-600'>
                      <FiTrash2 />
                    </a>
                    <a href="#" className='text-yellow-600'>
                      <LuPencil />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
      </div>
      <div className="overflow-auto md:block mt-6 hidden">
        <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
      </div>
      {/* Pagination Component */}
      {/* <Pagination
        pageCount={pages}
        changePage={changePage}
        page={page}
        rows={rows}
        pages={pages}
        msg={msg}
      /> */}
      
      

  
      {/* Grid Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-4'>
        {loading ? (
          <div className='p-3 text-sm text-gray-700 text-center'>
            Loading data...
          </div>
        ) : error ? (
          <div className='p-3 text-sm text-red-500 text-center'>
            Error fetching data: {error.message}
          </div>
        ) : category.length === 0 ? (
          <div className='p-3 text-sm text-gray-500 text-center'>
            No data available
          </div>
        ) : (category.map((item, index) => (
            <div key={item.id} className='bg-white space-y-3 p-4 rounded-lg shadow'>
              <div className='flex items-center space-x-2 text-sm'>
                <div>
                  <a href="#" className='text-blue-500 font-bold hover:underline'>#{index + 1}</a>
                </div>
                <div className='text-gray-500'>{item.nik}</div>
                <div>
                  <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50'>{item.status}</span>
                </div>
              </div>
              <div className='text-sm text-gray-700'>{item.nama}</div>
              <div className='text-sm font-medium text-black'>{item.pekerjaan}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DataPembelian;