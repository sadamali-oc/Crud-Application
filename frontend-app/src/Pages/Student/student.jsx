import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import ColorButtons from "../../Components/colorButtons";
import DataTable from "../../Components/studentTable";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Student() {


  // Add states 
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [fee, setFee] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [students, setUsers] = useState([]);

  // Error state for validation
  const [errors, setErrors] = useState({
    stname: "",
    course: "",
    fee: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:3000/api/student/");
    setUsers(result.data.data);
    console.log(result.data);
  }

  // Validation function
  function validateForm() {
    let formErrors = {};
    let isValid = true;

    if (!stname) {
      formErrors.stname = "Student Name is required";
      isValid = false;
    }
    if (!course) {
      formErrors.course = "Course Name is required";
      isValid = false;
    }
    if (!fee || isNaN(fee) || fee <= 0) {
      formErrors.fee = "Fee must be a positive number";
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!phone || phone.length < 10) {
      formErrors.phone = "Phone number should be at least 10 digits";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  }

  async function save(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/student/add", {
        stname,
        course,
        fee,
        email,
        phone,
      });
      alert("Student Registration Successfully");
      Load();
      resetForm();
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

    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/student/update/${id}`, {
        id: id,
        stname,
        course,
        fee,
        email,
        phone,
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
                error={!!errors.stname}
                helperText={errors.stname}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Course Name"
                variant="outlined"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                error={!!errors.course}
                helperText={errors.course}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fee"
                variant="outlined"
                value={fee}
                onChange={(event) => setFee(event.target.value)}
                error={!!errors.fee}
                helperText={errors.fee}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
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
