import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { useEffect } from 'react';

const DataTable = () => {
  useEffect(() => {
    // Fetch data from your API
    fetch('https://localhost:7160/api/ClientPreference')
      .then(response => response.json())
      .then(data => {
        // Check if DataTable is already initialized, then destroy it
        if ($.fn.DataTable.isDataTable('#myTable')) {
          $('#myTable').DataTable().destroy();
        }

        // Initialize DataTables
        $('#myTable').DataTable({
          data,
          columns: [
            { title: 'Name', data: 'name' },
            { title: 'Restaruant Id', data: 'tenantId' },
            { title: 'Address', data: 'address' },
            { title: 'Cell no', data: 'cellNo' },
          ],
        });
      });

  }, []); 

  return (
    <table id="myTable" className="min-w-full border border-gray-300 divide-y divide-gray-300">
      {/* Table body goes here */}
    </table>
  );
};

export default DataTable;
