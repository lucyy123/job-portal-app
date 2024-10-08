import { Box, Container, Grid, Typography } from "@mui/material";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import { JobReducerInitialState } from "../vite-env";
import Loader from "./Loader";

const JobsContainer = () => {

const {jobs,loading} = useSelector((state:{jobs:JobReducerInitialState})=>state.jobs)



if(loading) return <Loader></Loader>

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "4rem",
      }}
    >
      <Box marginInline={"5rem"}>
        {/* ---------------------  Latest jobs------------------------- */}
        <Typography variant="h4" mb={2} color={"primary.main"} fontWeight={"bold"}>
          Latest & Top{" "}
          <span
            style={{
              color: "#000",
            }}
          >
            Job Openings
          </span>
        </Typography>

        {/* ----------------------job cards -------------------------------- */}
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          
          
          {
          
         jobs?.slice(0,6) .map((ele, idx) => (
              <Grid item key={idx} >
                <JobCard job={ele} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobsContainer;




/**--------------- G R I D   E  X A M P L E --------------------
 * 
 * export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>1</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>2</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
} */
