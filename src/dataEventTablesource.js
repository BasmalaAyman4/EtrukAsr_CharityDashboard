export const userColumns = [
  { field: "id", headerName: "ID", width: 40 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
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
      width: 150,
  },
  {
      field: "name_ar",
      headerName: "Name Ar",
      width: 150,
  },

  {
      field: "start_date",
      headerName: "Start Date",
      width: 120,
  }
    ,
  {
      field: "end_date",
      headerName: "End Date",
      width: 120,
  },
  
  {
          
      field: "start_time",
      headerName: "Start Time",
      width: 100,
  },
  {
          
    field: "end_time",
    headerName: "End Time",
    width: 100,
},

 
];
