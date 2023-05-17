import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userColumns } from '../../dataDonationTablesource';



const DataDonation = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [data, setData] = useState([]);

  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  }

  useEffect(() => {
    axios.get("https://otrok.invoacdmy.com/api/dashboard/charity/donations", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('tokenC')}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        setData(response.data.donations)

      }
      ).catch((err) => { console.log(err) })
    reset()
  }, [])

  function handleAcceptDonation(id) {

    axios.post(`https://otrok.invoacdmy.com/api/dashboard/charity/donation/accept/${id}`, {},
      {
        headers:
        {
          "Authorization": `Bearer ${localStorage.getItem('tokenC')}`,
        }
      })
      .then(response => {

        toast.success(response.data.message)
        console.log(response)
      }
      ).catch((err) => {

        toast.error(err.response.data.message)
      })

  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            <Link to={`/donation/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>


            <button onClick={(e) => { handleAcceptDonation(params.row.id) }} className="updateButton" >
              accept
            </button>


          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Donations

      </div>
      <DataGrid
        key={seed}
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
      <ToastContainer />
    </div>
  )
}

export default DataDonation