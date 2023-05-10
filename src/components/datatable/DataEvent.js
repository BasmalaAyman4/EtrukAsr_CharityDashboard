import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userColumns } from '../../dataEventTablesource';

const DataEvent = () => {
    const [data, setData] = useState([]);
    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
     
    useEffect(() => {
      axios.get("https://otrok.invoacdmy.com/api/dashboard/events/index")
        .then(response => {
          console.log(response.data.result)
          setData(response.data.result)
        }
        ).catch((err) => { console.log(err) })
        reset()
    }, [])
    function handleDelete(id) {
  
      axios.post(`https://otrok.invoacdmy.com/api/dashboard/events/destroy/${id}`)
      .then(response => {
        toast.success(response.data.message)
        console.log(response)
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
            <div className="cellAction">
              <Link to={`/event/${params.row.id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
              <button
                onClick={(e)=>{handleDelete(params.row.id)}}
                className="deleteButton"
              >
                Delete
              </button>
              <Link to={`/editEvent/${params.row.id}`} style={{ textDecoration: "none" }}>
                <div className="updateButton">Update</div>
              </Link>
            </div>
          );
        },
      },
    ];
    return (
      <div className="datatable">
        <div className="datatableTitle">
          Add New Event
          <Link to="/event/new" className="link">
            Add New
          </Link>
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
    );
}

export default DataEvent