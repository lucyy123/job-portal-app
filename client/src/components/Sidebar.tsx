import {
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/reducers/jobs";
import { filteOption } from "../utils/constants";

const Sidebar = () => {
  const [filterValue, setFilterValue] = useState("");

  const dispatch = useDispatch()
  useEffect(() => {
    
 if(filterValue == "All"){
  dispatch(setSearchQuery(""))
 }else{

   dispatch(setSearchQuery(
     filterValue))
    }

  }, [filterValue,dispatch]);

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
          <FormControl >
            <RadioGroup  onChange={(e) => setFilterValue(e.target.value)}>

              {filteOption.map ((ele,idx)=>
              <Stack key={idx}>
                <Typography
             
                mt={"1rem"}
                variant="h4"
                fontWeight={"bold"}
                fontSize={"1.2rem"}
              >
               {ele.filterType}
              </Typography>
              {ele.filters.map((ele,index)=> <FormControlLabel
              key={`r${idx}-index${index}`}
                  control={<Radio />}
                  value={ele}
                  label={ele}
                >
                
                </FormControlLabel>)}
              
              </Stack>)}
            
              
            </RadioGroup>
          </FormControl>





      </Paper>
    </Stack>
  );
};

export default Sidebar;
