import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useCreateCompanyMutation } from "../../redux/api/companiesApi";
import { SingleCompany } from "../../redux/reducers/companies";
import { CreateCompanyRespone } from "../../vite-env";

const CreateNewCompany = () => {
  const navigate = useNavigate();
  const dispacth = useDispatch()
  const [companyName, setCompanyName] = useState<string>("");
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const handleRegisterCompany = async () => {
    try {
      // const formdata = new FormData();
      // formdata.append("name", companyName.toString());
      const res = await createCompany({name:companyName}).unwrap();
      if (res.success) {
        toast.success(res.message!);
        dispacth(SingleCompany(res.company))
        navigate(`/admin/companies/${res.company?._id}`);
      }
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const message = err.data as CreateCompanyRespone;
      toast.error(message.message);
      console.log("error:", error);
    }
  };


   if(isLoading) return <Loader></Loader>
  return (
    <Container
      maxWidth="md"
      sx={{
        paddingY: "2.2rem",
      }}
    >
      {/* ---------------Comapany name + subTitle--------------------- */}
      <Box mb={6}>
        <Typography variant="h4" fontWeight={"bold"} fontSize={"1.5rem"}>
          Your Company Name
        </Typography>
        <Typography variant="body2" fontSize={"1rem"} color={"GrayText"}>
          Please enter your company and Don't Worry ! you can update it later
        </Typography>
      </Box>

      {/* ------------------- TextField + button----------------------------- */}

      <Box>
        <Typography> Company Name </Typography>
        <TextField
          size="small"
          fullWidth
          value={companyName}
          placeholder="Enter Company Name"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Stack
          direction="row"
          gap={4}
          mt={2}
          sx={{
            "& .MuiButton-root": {
              textTransform: "none",
            },
          }}
        >
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={handleRegisterCompany}>
            Continue
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreateNewCompany;
