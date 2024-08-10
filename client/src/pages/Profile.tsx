import { ContactPhoneOutlined, EmailOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import userAvatar from "../assets/images/palestineFlag.jpg";
import TableComponent from "../components/Table";
import { skills } from "../utils/constants";
import { AppliedJobsTableRowType } from "../vite-env";
const Profile = () => {

  const rows: AppliedJobsTableRowType[] = [
    {
      id: 1,
      date: "26-11-2024",
      jobRole: "Fronend Developer",
      company: "Google",
      status: "Accepted",
    },
    {
      id: 2,
      date: "26-11-2024",
      jobRole: "Backend Developer",
      company: "Microsoft",
      status: "Rejected",
    },
    {
      id: 3,
      date: "26-11-2024",
      jobRole: "Full Stack Developer",
      company: "Asus",
      status: "Accepted",
    },
    {
      id: 4,
      date: "26-11-2024",
      jobRole: "Software  Developer",
      company: "Asus",
      status: "Rejected"
    },
  ];


  const columns:GridColDef[] = [

    { field: 'date', headerName: 'Date', width: 100,flex:1 },
    { field: 'jobRole', headerName: 'Job Role', width: 70 ,flex:1 },
    { field: 'company', headerName: 'Company', width: 70 ,flex:1 },
    { field: 'status', headerName: 'Status', width: 70,flex:1 ,  renderCell: (params) => {
      return (
        <Button  variant="contained" color={params.value=="Accepted"?"success":"error"} sx={{
          textTransform:"none",
          fontSize:"0.7rem",
          borderRadius:"25px"
        }} >
          {params.value}
        </Button>
      );
    }, },
  ]

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "1rem 1.5rem",
      }}
    >
      {/*---------------user Info section -----------------------  */}

      <Paper
        elevation={4}
        sx={{
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <Stack direction={"row"} gap={"1rem"}>
          {/* ---------------user avatar ---------------------*/}
          <Box
            width={"10%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              border: "1px solid grey",
              padding: "0.5rem",
              borderRadius: "10px",
            }}
          >
            <Avatar
              src={userAvatar}
              alt="user_avatar"
              sx={{
                width: "3rem",
                height: "3rem",
              }}
            />
          </Box>

          {/*  --------------user name + about ------------------ */}

          <Box flex={1}>
            <Stack justifyContent={"center"}>
              <Typography variant="h4" fontSize={"1.4rem"} fontWeight={"bold"}>
                Monis Khan
              </Typography>
              <Typography
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: "2",
                  fontSize: "0.85rem",
                  color: "GrayText",
                }}
              >
                {" "}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Delectus libero illo eligendi commodi. Totam, in quos vitae
                deserunt possimus nesciunt at similique aut unde qui animi? Eius
                illum consequuntur velit?
              </Typography>
            </Stack>
          </Box>
          {/* ------------  edit icon -----------------------------*/}
          <Box
            width={"10%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"start"}
          >
            <EditOutlinedIcon
              sx={{
                width: "2.3rem",
                height: "2.3rem",
              }}
            ></EditOutlinedIcon>
          </Box>
        </Stack>

        {/* -------------contacts and social links---------------- */}
        <Box marginTop={"1rem"}>
          <Stack direction={"row"} alignItems={"center"} gap={"0.6rem"}>
            {" "}
            <EmailOutlined></EmailOutlined>monisykhan@gmail.com
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={"0.6rem"} mt={1}>
            {" "}
            <ContactPhoneOutlined></ContactPhoneOutlined>9168830388
          </Stack>
        </Box>

        {/* ---------------------- Skills----------------------- */}

        <Box>
          <Typography variant="subtitle2" fontWeight={"bold"}>
            {" "}
            Skills{" "}
          </Typography>
          <Stack direction={"row"} gap={"0.3rem"} marginTop={"0.6rem"}>
            {skills.map((ele) => (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "25px",
                  fontSize: "0.7rem",
                }}
              >
                {ele}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* ------------------------ Resume------------- */}

        <Box>
          <Typography variant="subtitle2" fontWeight={"bold"}>
            {" "}
            Resume{" "}
          </Typography>
          <Link to="/">
            <Typography color={"blue"}>moniskhan_resume</Typography>
          </Link>
        </Box>
      </Paper>
      {/* ----------------- user appliead jobs ------------------------ */}

      <Box>
        <Typography
          variant="h4"
          fontSize={"1.4rem"}
          padding={"1rem 0.7rem"}
          fontWeight={"bold"}
        >
          {" "}
          Applied Jobs{" "}
        </Typography>
        <Box>
          <TableComponent rows={rows} columns={columns} height="15rem" widgth="100%" />
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
