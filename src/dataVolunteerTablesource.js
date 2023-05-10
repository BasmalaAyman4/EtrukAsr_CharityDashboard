export const userColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
        field: "name",
        headerName: "Name ",
        width: 100,
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
    },
    {
            
        field: "address",
        headerName: "Address",
        width: 150,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 100,
    }
      ,
    {
        field: "age",
        headerName: "Age",
        width: 100,
    },
    
    {
            
        field: "activity",
        headerName: "Activity",
        width: 100,
    },
      
 
    {
        field: "volunteer_type",
        headerName: "Type",
        width: 100,
        renderCell: (params) => {
    
          return (
         
            <div className={`cellWithStatus`}>
               {params.row.volunteer_type}
            </div>
          
          );

        },
      },
];
