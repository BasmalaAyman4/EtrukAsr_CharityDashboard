import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataTypeTablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";

const DataType = () => {
    const [data, setDataTypes] = useState([]);
    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
    useEffect(() => {
        axios.get("https://otrok.invoacdmy.com/api/dashboard/donationtype/index")
            .then(response => {
                setDataTypes(response.data.Donationtypes)
            }
            ).catch((err) => { console.log(err) })
    }, [])

    function handleDeleteCase(id) {
        axios.post(`https://otrok.invoacdmy.com/api/dashboard/donationtype/destroy/${id}`)
        .then(response => {
          toast.success(response.data.message)
          console.log(response)
        }
        ).catch((err) => { toast.error('there are cases related to this category please delete them first') })
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
                        <Link to={`/donaionTypes/${params.row.id}`}  style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={(e)=>{handleDeleteCase(params.row.id)}}
                        >
                            Delete
                        </div>
                        <Link to={`/editType/${params.row.id}`} style={{ textDecoration: "none" }}>
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
                Add New DonationType
                <Link to="/donaionTypes/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
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

export default DataType;
