import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataCaseTablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";

const DataCase = () => {

  const [data, setData] = useState([]);
  const [seed, setSeed] = useState(1);
  const reset = () => {
       setSeed(Math.random());
   }
   
  useEffect(() => {
    axios.get("https://otrok.invoacdmy.com/api/dashboard/case/index")
      .then(response => {
        console.log(response.data.cases)
        setData(response.data.cases)
      }
      ).catch((err) => { console.log(err) })
      reset()
  }, [])
  function handleDeleteCase(id) {

    axios.post(`https://otrok.invoacdmy.com/api/dashboard/case/destroy/${id}`)
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
            <Link to={`/cases/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <button
              onClick={(e)=>{handleDeleteCase(params.row.id)}}
              className="deleteButton"
            >
              Delete
            </button>
            <Link to={`/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Add New Case
        <Link to="/cases/new" className="link">
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
};
export default DataCase;

