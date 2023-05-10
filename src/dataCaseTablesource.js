export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Image",
    width: 130,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "name_en",
    headerName: "Name En",
    width: 200,
  },


  {
    field: "initial_amount",
    headerName: "Required Amount ",
    width: 200,
  },
 
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {

      return (
       
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
