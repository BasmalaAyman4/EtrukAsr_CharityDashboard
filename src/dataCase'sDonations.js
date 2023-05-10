export const userColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
        field: "name",
        headerName: "Name",
        width: 100,
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
    },
    {
        field: "method",
        headerName: "Method",
        width: 120,
    },
    {
        field: "amount",
        headerName: "Amount",
        width: 150,
        renderCell: (params) => {
    
          return (
           
            <div className={`cellWithStatus`}>
              {params.row.amount} {params.row.amount_description}
            </div>
          );
        },
      },

    // {
    //     field: "Case ",
    //     headerName: "Case",
    //     width: 100,
    //     renderCell: (params) => {
    //       return (
    //         <div className="cellWithImg">
    //           {params.row.casee.name_en}
    //         </div>
    //       );
    //     },
    //   },
      {
        field: "Type ",
        headerName: "Type Donation",
        width: 120,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.donationtype.name_en}
            </div>
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        renderCell: (params) => {
    
          return (
           
            <div className={`cellWithStatus ${params.row.status}`}>
              {params.row.status}
            </div>
          );
        },
      },

];
