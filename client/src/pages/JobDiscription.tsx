import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleJobQuery } from "../redux/api/jobsApi";
import { useDispatch, useSelector } from "react-redux";
import { noSingleJob, singleJob } from "../redux/reducers/jobs";
import { JobReducerInitialState } from "../vite-env";
import Loader from "../components/Loader";
import { rupessConverter } from "../utils/constants";

const JobDiscription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {getJob,loading} = useSelector((state:{jobs:JobReducerInitialState})=>state.jobs)
 

    const { refetch: job } = useGetSingleJobQuery( `${id??""}`);
  


  useEffect(() => {
    const getJobById = async () => {
      try {
        const res = await job();
        if (res.data?.success) {
          dispatch(singleJob(res.data?.job));

        } else {
          dispatch(noSingleJob());
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    getJobById();
  }, []);




if(loading) return <Loader></Loader>

  return (
    <Container maxWidth="lg">
      <Stack direction={"row"} marginTop={"2rem"}>
        <Stack marginRight={"auto"}>
          <Typography variant="h4" fontWeight={"bold"} fontSize={"1.4rem"}>
            {/* ----------------------------- TITLE---------------------------------- */}
         {getJob?.title}
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              gap:"1rem",
              "& .MuiButton-root": {
                textTransform: "none",
                borderRadius: "25px",
                fontSize: "0.7rem",
                fontWeight: "bold",
                marginTop: "1rem",
              },
            }}
            justifyContent={"space-between"}
          >
            {/* --------------------------- positions---------------------------- */}
            <Button variant="outlined" color="info">
              {getJob?.position} Positions
            </Button>
            {/* --------------------------- job type---------------------------- */}
            <Button variant="outlined" color="error">
             {getJob?.jobType}
            </Button>
            {/* --------------------------- salary / package---------------------------- */}
            <Button variant="outlined" color="primary">
            { getJob?.salary &&  rupessConverter(getJob?.salary)}/Yr
            </Button>
          </Stack>
        </Stack>
        <Box>
            {/* --------------------------- user applied or not---------------------------- */}

          <Button
            variant="contained"
            color="success"
            sx={{
              textTransform: "none",
            }}
          >
            Applied
          </Button>
        </Box>
      </Stack>

      {/* job discription */}

      <Paper
        elevation={2}
        sx={{
          marginY: "1rem",
          padding: "0.6rem 1rem",
        }}
      >
            {/* --------------------------- discriptions---------------------------- */}

        <Typography variant="subtitle2" fontSize={"1.1rem"}>
          {getJob?.discription}
        </Typography>
      </Paper>
      <Box
        sx={{
          "&>.MuiTypography-root ": {
            fontWeight: "bold",
          },
        }}
      >
        <Typography>
          Role:{" "}
          <span className="spantag" style={{ fontWeight: "normal" }}>
            {getJob?.title}
          </span>{" "}
        </Typography>
        <Typography>
          Location: <span style={{ fontWeight: "normal" }}>{getJob?.location} </span>
        </Typography>
        <Typography>
          Experince: <span style={{ fontWeight: "normal" }}>{getJob?.experienceLevel} Years </span>
        </Typography>
        <Typography>
          Salary: <span style={{ fontWeight: "normal" }}> { getJob?.salary &&  rupessConverter(getJob?.salary)}/Yr</span>
        </Typography>
        <Typography>
          Total Applicants: <span style={{ fontWeight: "normal" }}> {getJob?.applications.length}</span>
        </Typography>
        <Typography>
          Posted On: <span style={{ fontWeight: "normal" }}> { getJob?.createdAt.split("T")[0]}</span>
        </Typography> 
        <Stack direction={"row"} gap={"0.8rem"}>
          {" "}
          <Typography fontWeight={"bold"}>Discription: </Typography>
          <span style={{ fontWeight: "normal", textOverflow: "ellipsis" }}>
            {" "}
           {getJob?.discription}
          </span>
        </Stack>
      </Box>
    </Container>
  );
};

export default JobDiscription;
