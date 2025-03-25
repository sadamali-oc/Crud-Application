import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const StudentTable = ({ students, editStudent, deleteStudent }) => {
  // Define columns inside the component to access props
  const columns = [
    { field: "id", headerName: "Student Id", width: 90 },
    { field: "stname", headerName: "Student Name", width: 200 },
    { field: "course", headerName: "Course", width: 150 },
    { field: "fee", headerName: "Fee", width: 150 },
    { field: "phone", headerName: "Phone No", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "option",
      headerName: "Option",
      width: 200,
      renderCell: (params) => (
        <Box
          display="flex"
          gap={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => editStudent(params.row)}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => deleteStudent(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={students}
        columns={columns}
        pageSizeOptions={[5, 10, 20]} // Allow changing page size
        pagination
        disableSelectionOnClick
      />
    </Paper>
  );
};

export default StudentTable;
