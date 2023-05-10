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
        field: "name_ar",
        headerName: "Name Ar",
        width: 200,
    },
 
  

  ];
  