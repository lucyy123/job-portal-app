import { ArrowBack } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import useGetSingleCompany from "../../../hooks/useGetSingleCompany";
import { useUpdateCompanyMutation } from "../../../redux/api/companiesApi";
import { SingleCompany } from "../../../redux/reducers/companies";
import {
  ComapniesReducerInitialState,
  CreateCompanyRespone,
} from "../../../vite-env";

const Comapany = () => {
  const { id } = useParams();
  console.log('id:', id)
  useGetSingleCompany(id ||"")
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();
  const { singleCompany,loading} = useSelector(
    (state: { companies: ComapniesReducerInitialState }) => state.companies
  );
  const [name, setName] = useState<string >( singleCompany?.name || '');
  const [discription, setDiscription] = useState<string>(singleCompany?.discription || "");
  const [website, setWebsite] = useState<string>( singleCompany?.website ||"");
  const [location, setLocation] = useState<string>(singleCompany?.location || "");
  const [logo, setLogo] = useState<File | Blob>();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target?.files?.[0];
    setLogo(file);
  };

  const handleUpdate = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("discription", discription);
      formdata.append("location", location);
      formdata.append("website", website);
      formdata.append("logo", logo as Blob);
      const res = await updateCompany({ formdata, id }).unwrap();
      console.log('updated company:', res)
      if (res.success) {
        toast.success(res.message);
        dispacth(SingleCompany(res.updateCompany!));
        navigate("/admin/companies");
      }
    } catch (error) {
      const err = error as FetchBaseQueryError;
      const data = err.data as CreateCompanyRespone;
      toast.error(data.message);
      console.log("error:", error);
    }
  };

  if (loading) return <Loader></Loader>;

  return (
    <Container maxWidth="md">
      {/* ------------------ --------company title + back button --------------------------*/}
      <Stack direction={"row"} mt={3} mb={5}>
        <Button
          onClick={() => navigate("/admin/companies/create")}
          variant="outlined"
          sx={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ArrowBack></ArrowBack>
          back
        </Button>

        <Typography
          variant="h4"
          fontWeight={"bold"}
          fontSize={"1.6rem"}
          marginLeft={"30%"}
        >
          Company Setup
        </Typography>
      </Stack>

      {/* ----------------------------------------- form company update details --------------------------*/}

      <form>
        <Grid
          container
          spacing={3}
          sx={{
            "& .MuiTypography-root": {
              fontWeight: "600",
            },
          }}
        >
          {/* -------------------left colunm---------------- */}
          <Grid item md={6}>
            <Stack gap={2}>
              <Box>
                {/* --------------------- Company Name ------------------------------ */}
                <Typography>Comapny Name</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              {/* --------------------------------- Website---------------------------------- */}
              <Box>
                <Typography>Website</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Box>
            </Stack>
          </Grid>

          {/* -------------------rigth colunm---------------- */}

          <Grid item md={6}>
            <Stack gap={2}>
              <Box>
                {/* ---------------------- Discription ----------------------------------- */}
                <Typography>Discriptione</Typography>
                <TextField
                  fullWidth
                  size="small"
                  onChange={(e) => setDiscription(e.target.value)}
                  value={discription}
                />
              </Box>
              <Box>
                {/* ------------------------- location ------------------------------------- */}
                <Typography>Location</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Box>
            </Stack>
          </Grid>

          {/* bottom row */}
          <Grid item md={12}>
            {/* ----------------------------- logo ------------------------ */}
            <Typography>Logo</Typography>
            <TextField fullWidth size="small" required type="File" onChange={handleFile} />
          </Grid>
        </Grid>

        {isLoading && isLoading ? (
          <LoadingButton
            loading
            loadingPosition="center"
            variant="contained"
            fullWidth={true}
            
            sx={{ bgcolor: "primary.main" }}
          >
            <span>loading...</span>
          </LoadingButton>
        ) : (
          <Button
            onClick={handleUpdate}
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              marginTop: "1.5rem",
            }}
          >
            Update
          </Button>
        )}
      </form>
    </Container>
  );
};

export default Comapany;
