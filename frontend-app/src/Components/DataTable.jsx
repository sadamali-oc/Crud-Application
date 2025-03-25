import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box } from "@mui/material"; 

// Define columns
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
          onClick={() => params.row.editStudent(params.row)}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => params.row.deleteStudent(params.row.id)}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];

const DataTable = ({ students, editStudent, deleteStudent }) => {
  const rows = students.map((student) => ({
    ...student,
    editStudent,
    deleteStudent,
  }));

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </Paper>
  );
};

export default DataTable;
