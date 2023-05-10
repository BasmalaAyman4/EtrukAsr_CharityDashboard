import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userColumns } from '../../dataVolunteerTablesource';

const DataOfVoulenteerJoin = () => {
    const [data, setData] = useState([]);
    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
     const Id = useParams()
     
    useEffect(() => {
      axios.get(`https://otrok.invoacdmy.com/api/dashboard/events/show/${Id.eventId}`)
        .then(response => {
          
          setData(response.data.volunteers)
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
                <Link to={`/volunteer/${params.row.id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
             
            </div>
          );
        },
      },
    ];
    return (
      <div className="datatable">
      
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

export default DataOfVoulenteerJoin