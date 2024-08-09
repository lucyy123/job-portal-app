import { Search } from "@mui/icons-material";
import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const HeroSection = () => {
  const theme = useTheme();
  return (
    <Container>
      <Stack spacing={"1rem"} my={"1rem"} alignItems="center">
        <Typography
          component={"span"}
          variant="subtitle2"
          sx={{
            display: "inline-block",
            mx: "auto",
            fontWeight: "bold",
            backgroundColor: "aliceblue",
            padding: "0.6rem 0.7rem",
            color: "secondary.main",
            borderRadius: "20px",
          }}
        >
          No.1 Job Connects Website
        </Typography>

        <Typography
          variant="h1"
          fontSize={"3.5rem"}
          lineHeight={"3.6rem"}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Search, Apply & <br /> Get Your
          <span
            style={{
              color: theme.palette.primary.main,
              // marginLeft:
            }}
          >
            {" "}
            Dream Job
          </span>
        </Typography>
        <Typography variant="subtitle2" fontWeight={600} color={"grey"}>
          Empowering Your Career Journey, One Opportunity at a Time.
        </Typography>
{/* ----------------------- Search bar ------------------------ */}
        <Stack width={"100%"}  direction={"row"} justifyContent={"center"}>
          <Paper elevation={2} sx={{
            borderRadius:"25px 0 0 25px",
                width:"60%",
                my:"auto"
            }} >
            <input style={{
                border:"none",
                outline:"none",
                background:"transparent",
                width:"100%",
                padding:"1rem",
                borderRadius:"inherit",
            }}  placeholder="Find Your Dream Job..." />
          </Paper>
          <Button variant="contained" sx={{
            borderRadius:"0 25px 25px 0"
          }}>
            <Search></Search>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HeroSection;
