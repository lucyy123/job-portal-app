import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleJobQuery } from "../redux/api/jobsApi";
import { useDispatch, useSelector } from "react-redux";
import { noSingleJob, singleJob } from "../redux/reducers/jobs";
import { JobReducerInitialState, UserReducerInitialState } from "../vite-env";
import Loader from "../components/Loader";
import { rupessConverter } from "../utils/constants";
import { useLazyApplynewJobQuery } from "../redux/api/applications";
import toast from "react-hot-toast";

const JobDiscription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { user: UserReducerInitialState }) => state.user
  );
  const { getJob, loading } = useSelector(
    (state: { jobs: JobReducerInitialState }) => state.jobs
  );

  const initialAppliedCheecked = getJob?.applications?.some(
    (ele) => ele.applicants === user?.UserId
  ) as boolean;
  
  console.log('initialAppliedCheecked:', initialAppliedCheecked)

  const [isJobApplied, setIsJobApplied] = useState<boolean>(
    initialAppliedCheecked
  );
  const { refetch: job } = useGetSingleJobQuery(`${id ?? ""}`);
  const [fetchData,{data,isLoading} ]= useLazyApplynewJobQuery()

  useEffect(() => {
    const getJobById = async () => {
      try {
        const res = await job();
        if (res.data?.success) {
          dispatch(singleJob(res.data?.job));
          if (!isJobApplied) {
            setIsJobApplied(
              getJob?.applications?.some(
                (ele) => ele.applicants === user?.UserId
              ) as boolean
            );
          }
        } else {
          dispatch(noSingleJob());
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    getJobById();
  }, []);

  const hanldeJobApply = async () => {
    console.log("lkfjlskjdlf");
    try {
      const res = await fetchData(id!).unwrap();
      if (res.success) {
        toast.success(res?.message);
      }
      setIsJobApplied(true);
    } catch (error) {
      console.log("error:", error);
    }
  };

  if (loading) return <Loader></Loader>;

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
              gap: "1rem",
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
              {getJob?.salary && rupessConverter(getJob?.salary)}/Yr
            </Button>
          </Stack>
        </Stack>
        <Box>
          {/* --------------------------- user applied or not---------------------------- */}

          <Button
            onClick={hanldeJobApply}
            variant="contained"
            // todo:------------------------ need to change the disabled buton color---------------------------------
            disabled={isJobApplied}
            color={isJobApplied ? "success" : "info"}
            sx={{
              textTransform: "none",
            }}
          >
            {isJobApplied ? "Applied" : "Apply Now"}
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
          Location:{" "}
          <span style={{ fontWeight: "normal" }}>{getJob?.location} </span>
        </Typography>
        <Typography>
          Experince:{" "}
          <span style={{ fontWeight: "normal" }}>
            {getJob?.experienceLevel} Years{" "}
          </span>
        </Typography>
        <Typography>
          Salary:{" "}
          <span style={{ fontWeight: "normal" }}>
            {" "}
            {getJob?.salary && rupessConverter(getJob?.salary)}/Yr
          </span>
        </Typography>
        <Typography>
          Total Applicants:{" "}
          <span style={{ fontWeight: "normal" }}>
            {" "}
            {getJob?.applications.length}
          </span>
        </Typography>
        <Typography>
          Posted On:{" "}
          <span style={{ fontWeight: "normal" }}>
            {" "}
            {getJob?.createdAt.split("T")[0]}
          </span>
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
