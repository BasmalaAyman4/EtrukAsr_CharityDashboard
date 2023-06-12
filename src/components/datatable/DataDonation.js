import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userColumns } from '../../dataDonationTablesource';



const DataDonation = () => {

  const [data, setData] = useState([]);
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  }

  useEffect(() => {
    axios.get("https://otrok.invoacdmy.com/api/charity/donation/index", {
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

    axios.post(`https://otrok.invoacdmy.com/api/charity/donation/accept/${id}`, {},
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
  function handleDeleteCase(id) {

    axios.get(`https://otrok.invoacdmy.com/api/charity/donation/destroy/${id}`, {
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('tokenC')}`,
          "Content-Type": "multipart/form-data"

      }
  })
    .then(response => {
      toast.success(response.data.message)
    }
    ).catch((err) => { toast.error(err) })
    reset()
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {

        return (
          <>
          {params.row.status === 'pending' ?
          <div className="cellAction">
            <Link to={`/donation/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <button
              onClick={(e)=>{handleDeleteCase(params.row.id)}}
              className="deleteButton"
            >
              Delete
            </button>
            <button onClick={(e) => { handleAcceptDonation(params.row.id) }} className="updateButton" >
              accept
            </button>


          </div>
          :
          null
      }
          </>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
       All Donations

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