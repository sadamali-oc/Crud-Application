import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import ColorButtons from "../../Components/ColorButtons";
import DataTable from "../../Components/DataTable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Student() {
  //Add states
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [fee, setFee] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:3000/api/student/");
    setUsers(result.data.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/student/add", {
        stname: stname,
        course: course,
        fee: fee,
        email: email,
        phone: phone,
      });
      alert("Student Registration Successfully");

      Load();
      resetForm(); // Reset form after successful save
    } catch (err) {
      alert("User Registration Failed");
    }
  }

  async function editStudent(student) {
    setName(student.stname);
    setCourse(student.course);
    setFee(student.fee);
    setEmail(student.email);
    setPhone(student.phone);
    setId(student.id);
  }

  async function DeleteStudent(id) {
    await axios.delete(`http://localhost:3000/api/student/delete/${id}`);
    alert("Student deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/student/update/${id}`, {
        id: id,
        stname: stname,
        course: course,
        fee: fee,
        email: email,
        phone: phone,
      });
      alert("Registration Updated Successfully");
      Load();
      resetForm();
    } catch (err) {
      alert("Registration Failed");
    }
  }

  // Function to reset form after save or update
  function resetForm() {
    setId("");
    setName("");
    setCourse("");
    setFee("");
    setEmail("");
    setPhone("");
  }

  return (
    <div>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          color: "black",
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        Student Details
      </Typography>

      <Paper sx={{ padding: 4, margin: "auto", maxWidth: "800px" }}>
        <form onSubmit={save}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student Name"
                variant="outlined"
                value={stname}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Course Name"
                variant="outlined"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fee"
                variant="outlined"
                value={fee}
                onChange={(event) => setFee(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Grid>
          </Grid>

          <ColorButtons onSave={save} onUpdate={update} />
        </form>
      </Paper>

      <DataTable
        students={students}
        editStudent={editStudent}
        deleteStudent={DeleteStudent}
      />
    </div>
  );
}

export default Student;
