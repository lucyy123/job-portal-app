import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const JobDiscription = () => {
  return (
    <Container maxWidth="lg">
      <Stack direction={"row"} marginTop={"2rem"}>
        <Stack marginRight={"auto"}>
          <Typography variant="h4" fontWeight={"bold"} fontSize={"1.4rem"}>
            Frontend Developer
          </Typography>
          <Stack
            direction={"row"}
            sx={{
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
            <Button variant="outlined" color="info">
              12 Positions
            </Button>
            <Button variant="outlined" color="error">
              Full Time
            </Button>
            <Button variant="outlined" color="primary">
              24LPA
            </Button>
          </Stack>
        </Stack>
        <Box>
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
        <Typography variant="subtitle2" fontSize={"1.1rem"}>
          Job Discriptions
        </Typography>
        </Paper>
<Box sx={{
  '&>.MuiTypography-root ':{
    fontWeight:"bold",
  },
 

}}>
<Typography>Role: <span className="spantag" style={{fontWeight:"normal"}}>Frontend Developer</span> </Typography>
<Typography>Location: <span style={{fontWeight:"normal"}}>Hydrabad </span></Typography>
<Typography>Experince: <span style={{fontWeight:"normal"}}>2 Years </span></Typography>
<Typography>Salary: <span style={{fontWeight:"normal"}}> 12LPA</span></Typography>
<Typography>Total Applicants: <span style={{fontWeight:"normal"}}> 15</span></Typography>
<Typography>Posted On:  <span style={{fontWeight:"normal"}}>17-25-2024 </span></Typography>
<Stack direction={"row"} gap={"0.8rem"}> <Typography fontWeight={"bold"}>Discription: </Typography><span style={{fontWeight:"normal",textOverflow:"ellipsis"}}>   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, vitae. Perferendis voluptas doloribus repellendus eligendi explicabo iusto quas aliquam. Amet sapiente non excepturi fugiat aliquam officia unde ratione ea autem! </span></Stack>


</Box>

    </Container>
  );
};

export default JobDiscription;
