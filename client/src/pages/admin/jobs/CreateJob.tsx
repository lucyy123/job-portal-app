import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Container,
    Grid,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostJobMutation } from "../../../redux/api/jobsApi";
import { ComapniesReducerInitialState, JobCreatedResMessage } from "../../../vite-env";

const CreateJob = () => {
  const { companies } = useSelector(
    (state: { companies: ComapniesReducerInitialState }) => state.companies
  );
  const navigate = useNavigate()

  const [input, setInput] = useState({
    title: "",
    jobType: "",
    discription: "",
    requirments: "",
    experienceLevel: "",
    location: "",
    salary: "",
    position: "",
    company: "", // company id
  });


 const [postJob,{isLoading}] = usePostJobMutation()


  //*-----------------------------  SUBMIT FORM---------------------------------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
try {
    const res = await postJob(input).unwrap()

    if(res.success){
        toast.success(res.message)
        navigate('/admin/jobs')
    }

} catch (error) {
    const err = error as FetchBaseQueryError
    const message = err.data as JobCreatedResMessage
    console.log('error:', message.message)
    
}

    console.log('input', input)
  };

  //*------------------------------- ON CHANGE VALUES------------------------------------------

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    console.log("value:", value);
    const name = e.target.name;
    console.log("name:", name);

    setInput((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  //*----------------------------------- SELECT BOX---------------------------------------
  const hanldeSelectCompany = (event: SelectChangeEvent) => {
    const value = event.target.value;
    console.log("value:", value);

    setInput({ ...input, company: value });

    //   const inputDetails = {...input, company:value}
  };
  return (
    <Container maxWidth={"md"} sx={{ marginTop: "2rem" }}>
      <Paper
        elevation={2}
        sx={{
          width: "95%",
          padding: "1.5rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} columnSpacing={3}>
            {/* -------------------left column-------------- */}
            <Grid item md={6}>
              <Stack gap={2}>
                <Box>
                  {" "}
                  {/* -------------------- T I T L E --------------------------------------- */}
                  <Typography>Title</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter Job Title"
                    onChange={handleChange}
                    value={input.title}
                    name="title"
                  />
                </Box>
                <Box>
                  {/* ----------------- R E Q U I R E M E N T S---------------------------- */}{" "}
                  <Typography>Requirements</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter Job  requirements"
                    onChange={handleChange}
                    value={input.requirments}
                    name="requirments"
                  />
                </Box>
                {/* -------------------------------------------- L O C A T I O N S--------------------------------- */}
                <Box>
                  {" "}
                  <Typography>Location</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter Job's location"
                    onChange={handleChange}
                    value={input.location}
                    name="location"
                  />
                </Box>
                <Box>
                  {/* ----------------------------------------- E X P E R I  A N CE ---------------------------------------- */}{" "}
                  <Typography>Experience Level</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter experieance"
                    onChange={handleChange}
                    value={input.experienceLevel}
                    type="number"
                    name="experienceLevel"
                  />
                </Box>
              </Stack>
            </Grid>
            {/* ---------------------right column -----------------------*/}
            <Grid item md={6}>
              <Stack gap={2}>
                <Box>
                  {" "}
                  {/* ------------------------------------- D I S C R I P T I O N S -----------------------------------------  */}
                  <Typography>Discriptions</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter Job Discriptions"
                    onChange={handleChange}
                    value={input.discription}
                    name="discription"
                  />
                </Box>
                <Box>
                  {" "}
                  {/* ------------------------------------- s A L A R Y -----------------------------------------  */}
                  <Typography>Salary</Typography>
                  <TextField
                    size="small"
                    type="number"
                    fullWidth
                    placeholder="Enter salary"
                    onChange={handleChange}
                    value={input.salary}
                    name="salary"
                  />
                </Box>
                <Box>
                  {" "}
                  {/* ------------------------------------- J O B   T Y P E-----------------------------------------  */}
                  <Typography>Job Type</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter Job's Type"
                    onChange={handleChange}
                    value={input.jobType}
                    name="jobType"
                  />
                </Box>
                <Box>
                  {" "}
                  {/* -------------------------------------  P O S I T I O N S-----------------------------------------  */}
                  <Typography>Number of Positions</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter number of positions"
                    onChange={handleChange}
                    value={input.position}
                    name="position"
                  />
                </Box>
              </Stack>
            </Grid>

            {/* ?----------------------- bottom column------------------------- */}
            <Grid item md={12} sm={12} xs={12}>
              <Box>
                {" "}
                <Typography>Company</Typography>
                <Select
                  placeholder="Enter Company name"
                  fullWidth
                  value={input.company}
                  onChange={hanldeSelectCompany}
                >
                  {companies?.map((ele) => (
                    <MenuItem key={ele._id} value={ele._id}>
                      {ele.name}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </Box>



              {isLoading ?(
            <LoadingButton
              loading
              loadingPosition="center"
              variant="contained"
              fullWidth={false}
              
              sx={{ bgcolor:'primary.main'}}
            >
             
        <span>loading...</span>
            </LoadingButton>
            ):(
            <Button
           
              disabled={input.company == "" || input.discription == "" || input.experienceLevel == "" ||  input.jobType == "" || input.location == "" || input.position == "" || input.requirments == "" || input.salary == "" || input.title == ""    }
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                m: "2rem 0rem",
                textTransform: "none",
              }}
            >
                  Post
            </Button>
            )}

              {/* <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  // marginInline:"1rem"
                  my: "1rem",
                }}
              >
                {" "}
                Post
              </Button> */}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateJob;
