import {
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { filteOption } from "../utils/constants";

const Sidebar = () => {
  return (
    <Stack
      sx={{
        padding: "2rem",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: "0.5rem 1rem",
        }}
      >
        <Typography variant="h2" fontWeight={"bold"} fontSize={"1.4rem"}>
          {" "}
          Filter Jobs
        </Typography>
        {  filteOption.map((ele,idx)=><FormControl key={idx}>
              <RadioGroup>
               <Typography
             
                  mt={"1rem"}
                  variant="h4"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                >
                  {ele.filterType}
                </Typography>
                {ele.filters.map((ele,index) => (
                  <FormControlLabel
                  key={`${index}-${idx}`}
                    control={<Radio />}
                    value={ele}
                    label={ele}
                  ></FormControlLabel>
                ))}
            
          
          </RadioGroup>
        </FormControl>  ) }
       
      </Paper>
    </Stack>
  );
};

export default Sidebar;
