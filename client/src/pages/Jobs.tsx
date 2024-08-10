import { Box, Grid, Stack } from "@mui/material";
import SearchJobCard from "../components/SearchJobCard";
import Sidebar from "../components/Sidebar";

const Jobs = () => {
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

        <Grid container rowSpacing={3}columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Array(15)
            .fill(0)
            .map((ele, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4} >
                <SearchJobCard />
              </Grid>
            ))}
        </Grid>
            </Box>
      </Box>
    </Stack>
  );
};

export default Jobs;
