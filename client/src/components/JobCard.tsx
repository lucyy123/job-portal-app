import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { rupessConverter } from "../utils/constants";
import { Jobs } from "../vite-env";


type Props={
  job:Jobs
}

const JobCard = ({job}:Props) => {
  return (
    <Box maxWidth={395}>
      <Card variant="outlined">
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {/* Company Name */}
          <Typography variant="subtitle1" fontSize={"1rem"} fontWeight="bold">
          {job.company.name}
          </Typography>
          {/* Company Location */}
          <Typography variant="body2" color={"grey"} fontWeight="bold">
            {job.location}
          </Typography>
          {/* Job title */}
          <Typography variant="h6" fontWeight="bold">
           {job.title}
          </Typography>
          {/* Job discription */}
          <Typography
            variant="body2"
            color={"grey"}
            textOverflow={"ellipsis"}
            fontWeight="bold"
          >
           {job.discription}
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
             {job.position} Positions
            </Button>
            <Button variant="outlined" color="error">
            {job.jobType}
            </Button>
            <Button variant="outlined" color="primary">
              {rupessConverter(job.salary)}/Yr
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobCard;
