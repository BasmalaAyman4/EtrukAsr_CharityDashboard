
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userColumns } from '../../dataVolunteerTablesource';



const DataVolunteer = () => {
    const [token ,setToken] = useState(localStorage.getItem('token'))
    const [data, setData] = useState([]);

    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
     
    useEffect(() => {
      axios.get("https://otrok.invoacdmy.com/api/dashboard/volunteer/index")
        .then(response => {
          setData(response.data.volunteers)

        }
        ).catch((err) => { console.log(err) })
        reset()
    }, [])

    function handleAcceptDonation(id) {
  
      axios.post(`https://otrok.invoacdmy.com/api/dashboard/donation/accept/${id}`,{},
      {
        headers: 
        {
          "Authorization": `Bearer ${token}`,
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
        width: 100,
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

export default DataVolunteer;