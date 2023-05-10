import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { userColumns } from '../../dataCase\'sDonations';




const DonationList = () => {
    const [token ,setToken] = useState(localStorage.getItem('token'))
    const [data, setData] = useState([]);
   
  const casesId = useParams()
    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
     
    useEffect(() => {
      axios.get(`https://otrok.invoacdmy.com/api/dashboard/donation/index/case/${casesId.caseId}`)
        .then(response => {
          setData(response.data.donations)
          console.log(response.data.donations,'dddo')
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
        width: 150,
        renderCell: (params) => {
          
          return (
            <div className="cellAction">
              <Link to={`/cases/${params.row.id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
             
            
              <button   onClick={(e)=>{handleAcceptDonation(params.row.id)}} className="updateButton" >
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
    
        />
          <ToastContainer />
      </div>
  )
}

export default DonationList