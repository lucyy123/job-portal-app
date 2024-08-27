import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchJobCard from "../components/SearchJobCard";
import Sidebar from "../components/Sidebar";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { JobReducerInitialState } from "../vite-env";


const Jobs = () => {
  useGetAllJobs();

  const { jobs, searchQuery } = useSelector(
    (state: { jobs: JobReducerInitialState }) => state.jobs
  );
  const [filteredJob, setFilteredJob] = useState(jobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobsValue = jobs?.filter((ele) => {
        return (
          ele.location.toLowerCase().includes(searchQuery!.toLowerCase()) ||
          ele.discription.toLowerCase().includes(searchQuery!.toLowerCase()) ||
          ele.location.toLowerCase().includes(searchQuery!.toLowerCase()) ||
          ele.salary
            .toString()
            .toLowerCase()
            .includes(searchQuery!.toLowerCase()) || ele.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredJob(filteredJobsValue || []);
    }else{
      setFilteredJob(jobs)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, jobs]);

  console.log("filtered jobs", filteredJob);
  return (
    <Stack direction={"row"} gap={"0.5rem"} m={"2rem 3rem"}>
      {/*  //*-------------------- Side bar --  F I L T E R S --------------------- */}

      <Box width={"20%"}>
        <Sidebar />
      </Box>
      {/* -------------------- Jobs--------------------- */}
      <Box
        flex={1}
        sx={{
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        {filteredJob && filteredJob?.length > 0 ? (
          <Box>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {filteredJob.map((ele, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4}>
                  <SearchJobCard singlejob={ele} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box width={'100%'} height={'100%'} sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:'center'
          }}>

          <Typography variant="subtitle2" textAlign={"center"}>
            {" "}
          Sorry! No jobs are there
          </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Jobs;
