import { Box, Grid, Stack, Typography } from "@mui/material";
import SearchJobCard from "../components/SearchJobCard";
import Sidebar from "../components/Sidebar";
import { Jobs as AllJobs } from "../vite-env";

type JobsPros ={
jobs:AllJobs[] | null
}


const Jobs = ({jobs}:JobsPros) => {
  return (
    
    <Stack direction={"row"} gap={"0.5rem"} m={"2rem 3rem"}>
      {/* -------------------- Side bar--------------------- */}

      <Box width={"20%"}>
        
        <Sidebar/>
        
        </Box>
      {/* -------------------- Jobs--------------------- */}
      <Box
        flex={1}
        sx={{
          overflowY:"auto",
           flexShrink:0,
        }}
      >
        <Box>

        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          { jobs &&  jobs?.length > 0 ?  jobs .map((ele, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4} >
                <SearchJobCard  singlejob ={ele} />
              </Grid>
            )) : <Typography variant='h4'> no jobs are there</Typography>}
        </Grid>
            </Box>
      </Box>
    </Stack>
  );
};

export default Jobs;
