import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../dataCategoryTablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";

const DataCategory = () => {
    const [dataCategories, setDataCategories] = useState([]);
    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
    useEffect(() => {
        axios.get("https://otrok.invoacdmy.com/api/dashboard/category/index")
            .then(response => {
                setDataCategories(response.data.Categories)
            }
            ).catch((err) => { console.log(err) })
      

    }, [])
    function handleDeleteCase(id) {
        axios.post(`https://otrok.invoacdmy.com/api/dashboard/category/destroy/${id}`)
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
                        <Link to={`/categories/${params.row.id}`}  style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <button
                            onClick={(e)=>{handleDeleteCase(params.row.id)}}
                            className="deleteButton"
                            >
                            Delete
                            </button>
                            <Link to={`/editCategory/${params.row.id}`} style={{ textDecoration: "none" }}>
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
                Add New Category
                <Link to="/categories/new" className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                key={seed}
                className="datagrid"
                rows={dataCategories}
                columns={userColumns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
                <ToastContainer />
        </div>
    );
};

export default DataCategory;




































// import "./datatable.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from 'axios'
// import { ToastContainer, toast } from "react-toastify";

// const DataCategory = () => {
//   const [data, setData] = useState([]);
//   const [seed, setSeed] = useState(1);
//   const reset = () => {
//        setSeed(Math.random());
//    }
//   useEffect(() => {
//     axios.get("http://otrok.invoacdmy.com/api/dashboard/case/index")
//       .then(response => {
//         setData(response.data.cases)
//       }
//       ).catch((err) => { console.log(err) })
//       reset()
//   }, [])
//   function handleDeleteCase(id) {
//     axios.post(`http://otrok.invoacdmy.com/api/dashboard/case/destroy/${id}`)
//     .then(response => {
//       toast.success(response.data.message)
//       console.log(response)
//     }
//     ).catch((err) => { toast.error(err) })
//     reset()
//   }
//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
        
//         return (
//           <div className="cellAction">
//             <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//             </Link>
//             <button
//               onClick={(e)=>{handleDeleteCase(params.row.id)}}
//               className="deleteButton"
//             >
//               Delete
//             </button>
//           </div>
//         );
//       },
//     },
//   ];
//   return (
//     <div className="datatable">
//       <div className="datatableTitle">
//         Add New Case
//         <Link to="/users/new" className="link">
//           Add New
//         </Link>
//       </div>
//       <DataGrid
//        key={seed}
//         className="datagrid"
//         rows={data}
//         columns={userColumns.concat(actionColumn)}
//         pageSize={8}
//         rowsPerPageOptions={[8]}
//         checkboxSelection
//       />
//            <ToastContainer />
//     </div>
//   );
// };

// export default DataCategory;
