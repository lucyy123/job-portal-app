import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const JobCard = () => {
  return (
    <Box maxWidth={395}>
      <Card variant="outlined">
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {/* Company Name */}
          <Typography variant="subtitle1" fontSize={"1rem"} fontWeight="bold">
            Company Name
          </Typography>
          {/* Company Location */}
          <Typography variant="body2" color={"grey"} fontWeight="bold">
            India
          </Typography>
          {/* Job title */}
          <Typography variant="h6" fontWeight="bold">
            Job title
          </Typography>
          {/* Job discription */}
          <Typography
            variant="body2"
            color={"grey"}
            textOverflow={"ellipsis"}
            fontWeight="bold"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Porro totam
            quam impedit molestias quibusdam tempore soluta{" "}
          </Typography>
          {/* Job keys */}
          <Stack
            direction={"row"}
            sx={{
              "& .MuiButton-root": {
                textTransform: "none",
                borderRadius: "25px",
                fontSize: "0.7rem",
                fontWeight: "bold",
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobCard;
