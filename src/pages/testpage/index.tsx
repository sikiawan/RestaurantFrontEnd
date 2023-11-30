import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { useEffect } from 'react';

const DataTable = () => {
  useEffect(() => {
    // Initialize DataTables with server-side processing
    const table = $('#myTable').DataTable({
      serverSide: true,
      processing: true,
      ajax: {
        url: 'https://localhost:7160/api/ClientPreference',
        type: 'GET',
      },
      columns: [
        { title: 'Name', data: 'name' },
        { title: 'Restaruant Id', data: 'tenantId' },
        { title: 'Address', data: 'address' },
        { title: 'Cell no', data: 'cellNo' },
      ],
    });

    return () => {
      // Cleanup DataTable instance when component is unmounted
      table.destroy();
    };
  }, []); 

  return (
    <table id="myTable" className="min-w-full border border-gray-300 divide-y divide-gray-300">
      {/* Table body goes here */}
    </table>
  );
};

export default DataTable;
